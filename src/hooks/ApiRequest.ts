import { ApiResponse } from "../apis/ApiResponse";

export async function apiRequest<T>(apiFunc: () => Promise<ApiResponse<T>>): Promise<T | null> {
    const response = await apiFunc();
    if (response.isSuccess) {
        return response.data;
    } else {
        handleApiError(response);
        return null;
    }
};

export function handleApiError(response: ApiResponse<any>) {
    const { code, errorMsg } = response;
    console.error(`Error Code: ${code}, Message: ${errorMsg}`);
    alert(`Error: ${errorMsg} (Code: ${code})`);
};
