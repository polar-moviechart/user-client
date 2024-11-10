import { getAuthHeaders } from "../../utils/authUtils";
import { fetchWithErrorHandling } from "../ApiServiceBase";

export class MovieApiServiceSecure {
    private static instatnce: MovieApiServiceSecure | null = null;
    private static baseURL = process.env.REACT_APP_EDGE_SERVICE_URL + "/secure/api/v1/movies";

    constructor() {
        if (!MovieApiServiceSecure.instatnce) {
            MovieApiServiceSecure.instatnce = new MovieApiServiceSecure();
        }
        return MovieApiServiceSecure.instatnce;
    }

    static async submitMovieRating(code: number, rating: number, atk: string | undefined) {
        return await fetchWithErrorHandling<number>(
            `${this.baseURL}/${code}/rating`,
            "POST",
            {
                headers: getAuthHeaders(atk),
                data : {
                    rating: rating
                }
            }
        )
    }

    static async getMovieRating(code: number, atk: string) {
        return await fetchWithErrorHandling<number>(
            `${this.baseURL}/${code}/rating`,
            "GET",
            {
                headers: getAuthHeaders(atk)
            }
        );
    }
};
