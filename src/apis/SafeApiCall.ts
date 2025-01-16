import { ApiResponse } from "./ApiResponse";

export async function safeApiCall<T>(apiFunc: () => Promise<ApiResponse<T>>): Promise<ApiResponse<T>> {
    try {
        return await apiFunc();
    } catch (error: any) {
        const errorData = error.response.data;
        return {
            isSuccess: false,
            code: errorData.code || "E999",
            data: {} as T,
            errorMsg: errorData.errorMsg ? errorData.errorMsg : "알 수 없는 오류가 발생했습니다.",
        };
    }
};