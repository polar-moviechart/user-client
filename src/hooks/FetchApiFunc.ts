import { useEffect, useState } from "react";
import { ApiResponse } from "../apis/ApiResponse";
import { useJwtTokens } from "./useJwtTokens";
import { refreshTokenAndRetry } from "../services/TokenService";
import { removeAtk, setAtk } from "../utils/authUtils";

type FetchApiFunc<T> = () => Promise<ApiResponse<T>>;

export function useApiFetch<T>(apiFunc: FetchApiFunc<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorCode, setErrorCode] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { atk, rtk } = useJwtTokens();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await apiFunc();
            if (response.isSuccess) {
                setData(response.data);
            } else if (response.code === 'T101') {
                console.log("atk expired");
                console.log("atk = " + atk);
                const response = await refreshTokenAndRetry(rtk, apiFunc);
                if (response.code === 'T101') {
                    console.log("rtk expired");
                    console.log("refreshed atk = " + atk);
                    console.log("rtk = " + rtk);
                    removeAtk();
                    alert(response.errorMsg);
                    // window.location.href = '/login';
                }
            } else {
                setErrorCode(response.code);
                setError(response.errorMsg);
            }
            setLoading(false);
        };

        fetchData();
    }, [apiFunc, rtk]);

    return { data, loading, error, errorCode };
};
