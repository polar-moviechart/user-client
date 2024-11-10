import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useApiFetch } from "../../hooks/FetchApiFunc";
import { UserApiServicePublic } from "../../apis/user/UserApiServicePublic";
import { useJwtTokens } from "../../hooks/useJwtTokens";
import { setAuthHeaders } from "../../utils/authUtils";

const KakaoAuth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParam = new URLSearchParams(location.search);
    const { atk, rtk } = useJwtTokens();

    const kakaoUserId = Number(searchParam.get('id') ?? '0');
    if (kakaoUserId === 0) {
        throw new Error("카카오 로그인 중 문제가 발생했습니다.");
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const fetchKakaoLogin = useCallback(() => {
        return UserApiServicePublic.loginKakao(kakaoUserId);
    }, [kakaoUserId]);

    const { data: loginResponse, loading, error, errorCode } = useApiFetch(fetchKakaoLogin);

    useEffect(() => {
        if (loginResponse && !isLoggedIn) {
            setAuthHeaders(atk, rtk);
            setIsLoggedIn(true)
            navigate('/');
        }
    }, [loginResponse, setIsLoggedIn, navigate])

    if (loading) return <div>로딩 중 입니다.</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>카카오 로그인 인증 중 입니다.</h1>
        </div>
    );
};

export default KakaoAuth;
