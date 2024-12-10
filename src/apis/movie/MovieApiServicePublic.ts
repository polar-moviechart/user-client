import { fetchWithErrorHandling } from "../ApiServiceBase";
import { MovieInfoDto } from "./interfaces/MovieInfoDto";
import { StatType } from "./type/StatType";
import { MovieStatDto } from "./interfaces/MovieStatDto";
import { getAtk } from "../../utils/authUtils";
import { ApiResponse } from "../ApiResponse";

export class MovieApiServicePublic {
    private static instatnce: MovieApiServicePublic | null = null;
    private static baseURL = process.env.REACT_APP_EDGE_SERVICE_URL + "/public/api/v1/movies";

    constructor() {
        if (!MovieApiServicePublic.instatnce) {
            MovieApiServicePublic.instatnce = new MovieApiServicePublic();
        }
        return MovieApiServicePublic.instatnce;
    }


    static async getMovies(targetDate: string): Promise<ApiResponse<MovieInfoDto[]>> {
        const atk = getAtk();
        const headers = {
            Authorization: `Bearer ${atk}`,
        };

        const response = await fetchWithErrorHandling<MovieInfoDto[]>(
            `${this.baseURL}`,
            "GET",
            {
                params: { targetDate, page: 0, size: 10 },
                headers: headers
            }
        );
        return response;
    }

    static async getMovie(code: string): Promise<ApiResponse<MovieInfoDto>> {
        const atk = getAtk();
        const headers = {
            Authorization: `Bearer ${atk}`, // 기존 헤더와 병합될 예정
        };
        
        const response = await fetchWithErrorHandling<MovieInfoDto>(
            `${this.baseURL}/${code}`,
            "GET",
            {
                headers: headers
            }
        );
        
        
        return response;
    }

    static async getMovieStats(code: string, statType: StatType, limit: number): Promise<ApiResponse<MovieStatDto>> {
        const response = await fetchWithErrorHandling<MovieStatDto>(
            `${this.baseURL}/${code}/stats`,
            "GET",
            { 
                params: { 
                    type: statType,
                    limit: limit
                } 
            }
        );
        
        return response;
    };
};
