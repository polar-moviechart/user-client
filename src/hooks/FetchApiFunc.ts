import { useEffect, useState } from "react";
import { ApiResponse } from "../apis/ApiResponse";
import { clearTokens, getRtk, setAtk, useJwtTokens } from "../utils/authUtils";
import { handleApiError } from "./ApiRequest";
import { safeApiCall } from "../apis/SafeApiCall";
import { UserApiServiceSecure } from "../apis/user/UserApiServiceSecure";

type FetchApiFunc<T> = () => Promise<ApiResponse<T>>;

export function useApiFetch<T>(apiFunc: FetchApiFunc<T>) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const { rtk } = useJwtTokens();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const fetchWithRetry = async (): Promise<ApiResponse<T | null>> => {
                const response: ApiResponse<T | null> = await safeApiCall(apiFunc);
                if (response.code === 'T101' && rtk) {
                    await handleAtkExpired(rtk);
                    return apiFunc();
                }

                return response;
            };

            const response = await fetchWithRetry();
            if (response.isSuccess) {
                setData(response.data);
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

    return { data: data || ({} as T), isLoading };
}

async function handleAtkExpired(rtk: string) {
    const refreshedAtk = await UserApiServiceSecure.generateToken(rtk);
    if (refreshedAtk) {
        setAtk(refreshedAtk.data.accessToken);
    } else {
        clearTokens();
        alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
        window.location.href = '/login';
    }
};
