import { AxiosResponse } from "axios";
import { getRtk, setAtk } from "../utils/authUtils";
import createApiInstance from "./apiInstance";
import { ApiResponse } from "./ApiResponse";
import GenerateTokenRes from "./user/interfaces/GenerateTokenRes";

// 엑세스 토큰 설정 및 리프레쉬 토큰 갱신, 인터셉터 설정

const baseURL = process.env.REACT_APP_EDGE_SERVICE_URL + "/secure/api/v1/users";
const refreshAccessTokenApi = createApiInstance(baseURL);

const setAuthHeader = (apiInstance) => {
    const rtk = getRtk();
    if (rtk) {
        apiInstance.defaults.headers['Authorization'] = `Bearer ${rtk}`;
    }
};

const refreshAccessToken = async () => {
    try {
        const rtk = getRtk();
        if (!rtk) alert("로그아웃 되었습니다. 다시 로그인해 주세요.");

        const response: AxiosResponse<ApiResponse<GenerateTokenRes>> =
            await refreshAccessTokenApi.post('/generateToken')
        const apiResponse = response.data;

        if (!apiResponse.isSuccess) {
            alert('로그아웃 되었습니다. 다시 로그인해 주세요,');
        }

        const { accessToken } = apiResponse.data;

        setAtk(accessToken)
        return accessToken;
    } catch (error) {
        throw new Error("로그인에 실패했습니다.");
    }
};

// 요청 인터셉터 설정 (요청 전에 항상 Authorization 헤더 설정)
const setRequestInterceptor = (apiInstance) => {
    apiInstance.interceptors.request.use(
        (config) => {
            setAuthHeader(apiInstance);
            return config;
        },
        (error) => Promise.reject(error)
    );
};

// 응답 인터셉터 설정 (엑세스 토큰 만료시 다시 발급 후 재시도)
const setResponseInterceptor = (apiInstance) => {
    apiInstance.interceptors.response.use(
        (response: AxiosResponse<ApiResponse<any>>) => {
            const apiResponse = response.data;// 성공적인 응답은 그대로 반환

            if (!apiResponse.isSuccess) {
                alert(apiResponse.errorMsg);
                return Promise.reject(new Error(apiResponse.errorMsg));
            }
            return response;
        },
        async (error) => {
            const originalRequest = error.config;

            // ApiResponse 데이터 확인
            const apiResponse = error.response?.data;

            if (apiResponse?.code === 'T101' && !originalRequest._retry) {
                originalRequest._retry = true; // 무한 루프 방지

                try {
                    const newAccessToken = await refreshAccessToken();
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return apiInstance(originalRequest);
                } catch (err) {
                    window.location.href = '/login';
                    return Promise.reject(err);
                }
            }

            // 기타 에러는 그대로 전달
            return Promise.reject(error);
        }
    );
};

export { setRequestInterceptor, setResponseInterceptor };


