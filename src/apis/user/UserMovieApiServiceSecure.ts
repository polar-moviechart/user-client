import { getAtk } from "../../utils/authUtils";
import { ApiResponse } from "../ApiResponse";
import { fetchWithErrorHandling } from "../ApiServiceBase";
import Review from "./interfaces/Review";

export default class UserMovieApiServiceSecure {
    private static instance: UserMovieApiServiceSecure | null = null;
    private static baseURL = process.env.REACT_APP_EDGE_SERVICE_URL + "/secure/api/v1/users/movies";

    constructor() {
        if (!UserMovieApiServiceSecure.instance) {
            UserMovieApiServiceSecure.instance = new UserMovieApiServiceSecure();
        }
        return UserMovieApiServiceSecure.instance;
    }

    static async rateMovie(code: number, rating: number) {
        const data = {
            rating: rating
        };
        const atk = getAtk();
        const headers = {
            Authorization: `Bearer ${atk}`,
        };

        return await fetchWithErrorHandling<number>(
            `${this.baseURL}/${code}/rating`,
            "POST",
            {
                headers,
                data,
            }
        );
    }

    static async addReview(code: number, review: string): Promise<Review> {
        const atk = getAtk();
        const headers = {
            Authorization: `Bearer ${atk}`,
        };
        
        const reseponse = await fetchWithErrorHandling<Review>(
            `${this.baseURL}/${code}/reviews`,
            "POST",
            {
                headers,
                data: {
                    'content': review
                }
            }
        );
        return reseponse.data;
    }

    static async getMyReviews(): Promise<ApiResponse<Review[]>> {
        const atk = getAtk();
        const headers = {
            Authorization: `Bearer ${atk}`,
        };

        const response = await fetchWithErrorHandling<Review[]>(
            `${this.baseURL}/reviews`,
            "GET",
            {
                headers: headers,
                params: { page: 0, size: 10 }
            }
        );
        return response;
    }
}