import axios from "axios";
import { getAtk, getAuthHeaders } from "../../utils/authUtils";
import { ApiResponse } from "../ApiResponse";
import { MovieInfoDto } from "./interfaces/MovieInfoDto";
import { Page } from "./interfaces/Page";

export class MovieApiServiceSecure {
    private static instatnce: MovieApiServiceSecure | null = null;
    private static baseURL = process.env.REACT_APP_EDGE_SERVICE_URL + "/secure/api/v1/movies";

    constructor() {
        if (!MovieApiServiceSecure.instatnce) {
            MovieApiServiceSecure.instatnce = new MovieApiServiceSecure();
        }
        return MovieApiServiceSecure.instatnce;
    }

    static async submitMovieRating(code: number, rating: number, atk: string | undefined): Promise<number> {
        return axios.post(`${this.baseURL}/${code}/rating`, {
            headers: getAuthHeaders(atk),
            data: {
                rating: rating
            }
        })
            .then((response) => { return response.data });
    }

    static async getMovieRating(code: number, atk: string) {
        return axios.get(`${this.baseURL}/${code}/rating`, {

            headers: getAuthHeaders(atk)

        })
            .then((response) => { return response.data });
    }

    static getLikedMovie(page: number, size: number): Promise<ApiResponse<Page<MovieInfoDto[]>>> {
        const atk = getAtk();
        const headers = {
            Authorization: `Bearer ${atk}`,
        };
        return axios.get(`${this.baseURL}/likes`, {
            headers: headers,
            params: { page: page, size: size }
        }).then((response) => { return response.data });
    }
};
