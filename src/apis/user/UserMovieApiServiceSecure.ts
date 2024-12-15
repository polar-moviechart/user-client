import axios from "axios";
import { getAtk } from "../../utils/authUtils";
import { ApiResponse } from "../ApiResponse";
import { UpdateLikeRes } from "../movie/interfaces/UpdateLikeRes";
import Likes from "./interfaces/Likes";
import Review from "./interfaces/Review";
import { RateResponse } from "../movie/interfaces/RateResponse";

export default class UserMovieApiServiceSecure {
    private static instance: UserMovieApiServiceSecure | null = null;
    private static baseURL = process.env.REACT_APP_EDGE_SERVICE_URL + "/secure/api/v1/users/movies";

    constructor() {
        if (!UserMovieApiServiceSecure.instance) {
            UserMovieApiServiceSecure.instance = new UserMovieApiServiceSecure();
        }
        return UserMovieApiServiceSecure.instance;
    }

    static async rateMovie(code: number, rating: number): Promise<ApiResponse<RateResponse>> {
        const atk = getAtk();
        const headers = {
            Authorization: `Bearer ${atk}`,
        };

        return await axios.post(`${this.baseURL}/${code}/rating`,
            { rating: rating },
            { headers: headers },
        ).then((response) => { return response.data });;
    };

    static async addReview(code: number, review: string): Promise<ApiResponse<Review>> {
        const atk = getAtk();
        const headers = {
            Authorization: `Bearer ${atk}`,
        };

        return axios.post(`${this.baseURL}/${code}/reviews`,
            { 'content': review },
            { headers: headers },
        ).then((response) => { return response.data });;
    }

    static async getMyReviews(): Promise<ApiResponse<Review[]>> {
        const atk = getAtk();
        const headers = {
            Authorization: `Bearer ${atk}`,
        };

        return axios.get(`${this.baseURL}/reviews`, {
            headers: headers,
            params: { page: 0, size: 10 }

        }).then((response) => { return response.data });;
    };

    static getMyLikes(): Promise<ApiResponse<Likes[]>> {
        const atk = getAtk();
        const headers = {
            Authorization: `Bearer ${atk}`,
        };

        return axios.get(`${this.baseURL}/likes`, {
            headers: headers,
            params: { page: 0, size: 10 }
        }).then((response) => { return response.data });
    }

    static async updateLike(code: number, likeStatus: boolean): Promise<ApiResponse<UpdateLikeRes>> {
        const atk = getAtk();
        const headers = {
            Authorization: `Bearer ${atk}`,
        };
        console.log('updateLike', likeStatus);
        return axios.post(`${this.baseURL}/${code}/likes`,
            { isLike: likeStatus },
            { headers: headers }
        ).then((response) => { return response.data });;
    }
}