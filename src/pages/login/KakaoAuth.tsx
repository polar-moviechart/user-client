import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useApiFetch } from "../../hooks/FetchApiFunc";
import { UserApiServicePublic } from "../../apis/user/UserApiServicePublic";
import { setAuthHeaders } from "../../utils/authUtils";
import { LoginResponse } from "../../apis/user/interfaces/LoginResponse";
import { ApiResponse } from "../../apis/ApiResponse";

const KakaoAuth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParam = new URLSearchParams(location.search);

    const kakaoUserId = Number(searchParam.get('id') ?? '0');
    if (kakaoUserId === 0) {
        throw new Error("카카오 로그인 중 문제가 발생했습니다.");
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const fetchKakaoLogin = useCallback((): Promise<ApiResponse<LoginResponse>> => {
        return UserApiServicePublic.loginKakao(kakaoUserId);
    }, [kakaoUserId]);

    const loginResponse: LoginResponse | null = useApiFetch(fetchKakaoLogin);

    useEffect(() => {
        if (loginResponse !== null && !isLoggedIn) {
            setAuthHeaders(loginResponse.accessToken, loginResponse.refreshToken);
            setIsLoggedIn(true)
            navigate('/');
        }
    }, [loginResponse, setIsLoggedIn, navigate])

    return (
        <div>
            <h1>카카오 로그인 인증 중 입니다.</h1>
        </div>
    );
};

export default KakaoAuth;
