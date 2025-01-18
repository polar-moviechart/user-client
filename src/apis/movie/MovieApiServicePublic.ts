import { MovieInfoDto } from "./interfaces/MovieInfoDto";
import { StatType } from "./type/StatType";
import { MovieStatDto } from "./interfaces/MovieStatDto";
import { ApiResponse } from "../ApiResponse";
import { Page } from "./interfaces/Page";
import { MovieStatDatesRes } from "./interfaces/MovieStatDatesRes";
import createApiInstance from "../apiInstance";
import { setRequestInterceptor, setResponseInterceptor } from "../authInterceptor";
import { handleApiResponse } from "../HandleApiResponse";
import { stat } from "fs";

const apiUrl = process.env.REACT_APP_EDGE_SERVICE_URL + "/public/api/v1/movies";
const apiInstance = createApiInstance(apiUrl);

setRequestInterceptor(apiInstance);
setResponseInterceptor(apiInstance);

export const getDateRange = async ():
    Promise<ApiResponse<MovieStatDatesRes>> => {
    return (await apiInstance.get('/date-range')).data;
}

export const getMovies = async (
    targetDate: string,
    page: number,
    size: number
): Promise<Page<MovieInfoDto[]>> => {
    const response = await apiInstance.get<ApiResponse<Page<MovieInfoDto[]>>>(
        '', {
            params: { targetDate, page, size },
    });
    return handleApiResponse(response.data);
}

export const getMovie = async (
    code: string
): Promise<MovieInfoDto> => {
    const response = await apiInstance.get<ApiResponse<MovieInfoDto>>(
        `${code}`
    );
    return handleApiResponse(response.data);
}

export const getMovieStats = async (
    code: string,
    statType: StatType,
    limit: number
): Promise<MovieStatDto> => {
    const response = await apiInstance.get<ApiResponse<MovieStatDto>>(
        `/${code}/stats`, {
            params: {
                type: statType,
                limit: limit
            }
        }
    )
    return handleApiResponse(response.data);
}
