import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UserApiServicePublic } from "../../apis/user/UserApiServicePublic";
import { setAuthHeaders } from "../../utils/authUtils";
import { safeApiCall } from "../../apis/SafeApiCall";

type KakaoAuthProps = {
    Layout: React.FC<{ children: React.ReactNode }>;
};

const KakaoAuth = ({ Layout }: KakaoAuthProps) => {
    const location = useLocation();
    const searchParam = new URLSearchParams(location.search);
    const navigate = useNavigate();

    const kakaoUserId = Number(searchParam.get('id') ?? '0');

    useEffect(() => {
        if (kakaoUserId === 0) {
            throw new Error("카카오 로그인 중 문제가 발생했습니다.");
        }

        const fetchKakaoLogin = async () => {
            const response = await safeApiCall(() => UserApiServicePublic.loginKakao(kakaoUserId));
            if (response.isSuccess) {
                setAuthHeaders(response.data.accessToken, response.data.refreshToken);
                navigate('/');
            }
        };

        fetchKakaoLogin();
    }, []);


    return (
        <div>
            <h1>카카오 로그인 인증 중 입니다.</h1>
        </div>
    );
};

export default KakaoAuth;
