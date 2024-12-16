import { MovieInfoDto } from "./interfaces/MovieInfoDto";
import { StatType } from "./type/StatType";
import { MovieStatDto } from "./interfaces/MovieStatDto";
import { getAtk } from "../../utils/authUtils";
import { ApiResponse } from "../ApiResponse";
import axios from "axios";
import { Page } from "./interfaces/Page";

export class MovieApiServicePublic {
    private static instatnce: MovieApiServicePublic | null = null;
    private static baseURL = process.env.REACT_APP_EDGE_SERVICE_URL + "/public/api/v1/movies";

    constructor() {
        if (!MovieApiServicePublic.instatnce) {
            MovieApiServicePublic.instatnce = new MovieApiServicePublic();
        }
        return MovieApiServicePublic.instatnce;
    }


    static async getMovies(targetDate: string, page: number, size: number): Promise<ApiResponse<Page<MovieInfoDto[]>>> {
        const atk = getAtk();
        const headers = {
            Authorization: `Bearer ${atk}`,
        };

        return await axios.get(`${this.baseURL}`, {
            headers: headers,
            params: { targetDate, page: page, size: size },
        })
        .then((response) => {return response.data});
    }

    static async getMovie(code: string): Promise<ApiResponse<MovieInfoDto>> {
        const atk = getAtk();
        const headers = {
            Authorization: `Bearer ${atk}`,
        };

        return await axios.get(`${this.baseURL}/${code}`, {
            headers: headers
        })
        .then((response) => {return response.data});
    }

    static async getMovieStats(code: string, statType: StatType, limit: number): Promise<ApiResponse<MovieStatDto>> {
        return await axios.get(`${this.baseURL}/${code}/stats`, {
            params: {
                type: statType,
                limit: limit
            }
        })
        .then((response) => {return response.data});
    };
};
