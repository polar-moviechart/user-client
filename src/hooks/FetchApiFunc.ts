import { useEffect, useState } from "react";
import { ApiResponse } from "../apis/ApiResponse";
import { clearTokens, getRtk, setAtk, useJwtTokens } from "../utils/authUtils";
import { handleApiError } from "./ApiRequest";
import { safeApiCall } from "../apis/SafeApiCall";
import { UserApiServiceSecure } from "../apis/user/UserApiServiceSecure";

type FetchApiFunc<T> = () => Promise<ApiResponse<T>>;

export function useApiFetch<T>(apiFunc: FetchApiFunc<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { rtk } = useJwtTokens();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const fetchWithRetry = async (): Promise<ApiResponse<T | null>> => {
                const response: ApiResponse<T | null> = await safeApiCall(apiFunc);
                // console.log(response)
                if (response.code === 'T101' && rtk) {
                    console.log('엑세스 토큰 만료')
                    await handleAtkExpired(rtk);
                    return apiFunc();
                }

                return response;
            };

            const response = await fetchWithRetry();
            if (response.isSuccess) {
                setData(response.data);
                return;
            } else if (!getRtk()) {
                clearTokens();
                alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
                window.location.href = '/login';
            } else {
                handleApiError(response);
            }
            setLoading(false);
        };

        fetchData();
    }, [apiFunc, rtk]);

    return data;
}

async function handleAtkExpired(rtk: string) {
    console.log('handleAtkExpired');
    console.log('rtk = ', rtk);
    const refreshedAtk = await UserApiServiceSecure.generateToken(rtk);
    if (refreshedAtk) {
        // console.log('이전 atk = ', Cookies.get('polar-atk'));
        setAtk(refreshedAtk.data.accessToken);
        // console.log('새로운 atk = ', Cookies.get('polar-atk'));
    } else {
        clearTokens();
        alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
        window.location.href = '/login';
    }
};
