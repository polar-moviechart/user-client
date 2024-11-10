import { ApiResponse } from "../apis/ApiResponse";

export type FetchApiFunc<T> = () => Promise<ApiResponse<T>>;