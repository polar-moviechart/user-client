import { MovieInfoDto } from "./interfaces/MovieInfoDto";
import { StatType } from "./type/StatType";
import { MovieStatDto } from "./interfaces/MovieStatDto";
import { ApiResponse } from "../ApiResponse";
import { Page } from "./interfaces/Page";
import { MovieStatDatesRes } from "./interfaces/MovieStatDatesRes";
import createApiInstance from "../apiInstance";
import { setRequestInterceptor, setResponseInterceptor } from "../authInterceptor";

const apiUrl = process.env.REACT_APP_EDGE_SERVICE_URL + "/public/api/v1/movies";
const apiInstance = createApiInstance(apiUrl);

setRequestInterceptor(apiInstance);
setResponseInterceptor(apiInstance);

export const getDateRange = async ():
    Promise<ApiResponse<MovieStatDatesRes>> => {
    return (await apiInstance.get('/date-range')).data;
}

export const getMovies = async (targetDate: string, page: number, size: number):
    Promise<ApiResponse<Page<MovieInfoDto[]>>> => {
    return (
        await apiInstance.get('', {
        params: { targetDate, page, size },
    })
    ).data;
}

export const getMovie = async (code: string):
    Promise<ApiResponse<MovieInfoDto>> => {
    return (await apiInstance.get(`${code}`)).data;
}

export const getMovieStats = async (code: string, statType: StatType, limit: number):
    Promise<ApiResponse<MovieStatDto>> => {
    return (
        await apiInstance.get(`/${code}/stats`, {
        params: {
            type: statType,
            limit: limit
        }
    })
    ).data;
}
