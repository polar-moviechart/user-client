import { ApiResponse } from "./ApiResponse";

export const handleApiResponse = <T>(response: ApiResponse<T>): T => {
    if (!response.isSuccess) {
        alert(response.errorMsg);
        throw new Error(response.errorMsg);
    }
    return response.data;
}