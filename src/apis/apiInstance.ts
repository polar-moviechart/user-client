import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "./ApiResponse";

const createApiInstance = (apiUrl) => {
    const instance = axios.create({
        baseURL: apiUrl,
        headers: {
            'Content-Type': 'applicatioin/json',
        },
    });

    instance.interceptors.response.use(
        (response: AxiosResponse<ApiResponse<any>>): AxiosResponse<ApiResponse<any>>  => {
            const apiResponse = response.data;

            if (!apiResponse.isSuccess) {
                alert(apiResponse.errorMsg);
                throw new Error(apiResponse.errorMsg);
            }

            // 성공적인 응답 반환 (AxiosResponse 구조 유지)
            return {
                ... response,
                data: apiResponse, // ApiResponse 데이터만 변경
            };
        },
        (error) => {
            // 네트워크 오류 등 처리
            return Promise.reject(error);
        }
    );

    return instance;
};

export default createApiInstance;