import axios, { AxiosRequestConfig, Method } from "axios";
import { ApiResponse } from "./ApiResponse";

export async function fetchWithErrorHandling<T>(
    url: string,
    method: Method,
    options?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
    try {
        const { data, ...restOptions } = options || {};
        const response = await axios.request<ApiResponse<T>>({
            url,
            method,
            data,
            ...restOptions,
        });
        return response.data;
    } catch (error: any) {
        return {
            isSuccess: false,
            code: error?.response?.data?.code || error?.response?.status.toString(),
            data: {} as T,
            errorMsg: error?.response?.data?.errorMsg || error.message || "Unknown error occurred",
        }
    }
}
