import axios, { AxiosRequestConfig, Method } from "axios";
import { ApiResponse } from "./ApiResponse";

export async function fetchWithErrorHandling<T>(
    url: string,
    method: Method,
    options?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
    try {
        const response = await axios.request<ApiResponse<T>>({
            url,
            method,
            ...options,
        });
        return response.data;
    } catch (error: any) {
        return {
            isSuccess: false,
            code: error?.response?.status.toString() || "UNKNOWN_ERROR",
            data: {} as T,
            errorMsg: error?.response?.data?.errorMsg || error.message || "Unknown error occurred",
        }
    }
}
