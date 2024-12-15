import axios from "axios";
import { getAuthHeaders } from "../../utils/authUtils";

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
        .then((response) => {return response.data});
    }

    static async getMovieRating(code: number, atk: string) {
        return axios.get(`${this.baseURL}/${code}/rating`, {

            headers: getAuthHeaders(atk)

        })
        .then((response) => {return response.data});
    }
};
