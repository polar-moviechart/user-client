import { getAtk } from "../../utils/authUtils";
import { fetchWithErrorHandling } from "../ApiServiceBase";
import Review from "./interfaces/Review";

export default class UserMovieApiServicePublic {
    private static instance: UserMovieApiServicePublic | null = null;
    private static baseURL = process.env.REACT_APP_EDGE_SERVICE_URL + "/public/api/v1/users/movies";

    constructor() {
        if (!UserMovieApiServicePublic.instance) {
            UserMovieApiServicePublic.instance = new UserMovieApiServicePublic();
        }
        return UserMovieApiServicePublic.instance;
    }

    static async getReviews(code: number) {
        const atk = getAtk();
        const headers = {
            Authorization: `Bearer ${atk}`,
        };

        const response = await fetchWithErrorHandling<Review[]>(
            `${this.baseURL}/${code}/reviews`,
            "GET",
            {
                headers: headers
            }
        );
        return response.data;
    }
}
