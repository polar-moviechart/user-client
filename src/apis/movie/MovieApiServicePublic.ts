import { fetchWithErrorHandling } from "../ApiServiceBase";
import { MovieInfoDto } from "./interfaces/MovieInfoDto";
import { StatType } from "./type/StatType";
import { MovieStatDto } from "./interfaces/MovieStatDto";

export class MovieApiServicePublic {
    private static instatnce: MovieApiServicePublic | null = null;
    private static baseURL = process.env.REACT_APP_EDGE_SERVICE_URL + "/public/api/v1/movies";

    constructor() {
        if (!MovieApiServicePublic.instatnce) {
            MovieApiServicePublic.instatnce = new MovieApiServicePublic();
        }
        return MovieApiServicePublic.instatnce;
    }


    static async getMovies(targetDate: string, atk: string | null) {
        const response = await fetchWithErrorHandling<MovieInfoDto[]>(
            `${this.baseURL}`,
            "GET",
            {
                params: { targetDate, page: 0, size: 10 },
                headers: { Authorization: atk ? `Bearer ${atk}` : undefined }
            }
        );
        console.log("edge-service-url = ", this.baseURL);
        return response;
    }

    static async getMovie(code: string, atk: string | null) {
        const response = await fetchWithErrorHandling<MovieInfoDto>(
            `${this.baseURL}/${code}`,
            "GET",
            { headers: { Authorization: atk ? `Bearer ${atk}` : undefined } }
        );
        
        return response;
    }

    static async getMovieRating(code: string) {
        const response = await fetchWithErrorHandling<string>(
            `${this.baseURL}/${code}/rating`,
            "GET"
        );
        
        return response;
    }

    static async getMovieStats(code: string, statType: StatType, limit: number) {
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