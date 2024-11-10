import { useEffect, useRef, useState } from "react";
import { ApiResponse } from "../apis/ApiResponse";
import { useJwtTokens } from "./useJwtTokens";
import { refreshTokenAndRetry } from "../services/TokenService";

type FetchApiFunc<T> = () => Promise<ApiResponse<T>>;

export function useApiFetch<T>(apiFunc: FetchApiFunc<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorCode, setErrorCode] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { atk, rtk } = useJwtTokens();

    const retryCnt = useRef(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await apiFunc();
            if (response.isSuccess) {
                setData(response.data);
            } else if (response.code === 'T101' && retryCnt.current < 2) {
                retryCnt.current += 1;
                const response = await refreshTokenAndRetry(rtk, apiFunc);
                setData(response.data);
                setErrorCode(response.code);
                setError(response.errorMsg);
            } else {
                setErrorCode(response.code);
                setError(response.errorMsg);
            }
            setLoading(false);
        };

        fetchData();
    }, [apiFunc, rtk]);
    
    return { data, loading, error, errorCode};
};
