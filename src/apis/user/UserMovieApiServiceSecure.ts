import { getAuthHeaders } from "../../utils/authUtils";
import { fetchWithErrorHandling } from "../ApiServiceBase";

export default class UserMovieApiServiceSecure {
    private static instance: UserMovieApiServiceSecure | null = null;
    private static baseURL = process.env.REACT_APP_EDGE_SERVICE_URL + "/secure/api/v1/users/movies";

    constructor() {
        if (!UserMovieApiServiceSecure.instance) {
            UserMovieApiServiceSecure.instance = new UserMovieApiServiceSecure();
        }
        return UserMovieApiServiceSecure.instance;
    }

    static async rateMovie(code: number, rating: number, atk: string | undefined) {
        const data = {
            rating: rating
        };
        const headers = {
            'Content-Type': 'application/json',
            ...getAuthHeaders(atk)
        };

        const response = await fetchWithErrorHandling<number>(
            `${this.baseURL}/${code}/rating`,
            "POST",
            {
                headers,
                data,
            }
        );

        return response;
    }
}