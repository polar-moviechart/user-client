import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useApiFetch } from "../../hooks/FetchApiFunc";
import { UserApiServicePublic } from "../../apis/user/UserApiServicePublic";

const KakaoAuth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParam = new URLSearchParams(location.search);

    const kakaoUserId = Number(searchParam.get('id') ?? '0');
    if (kakaoUserId === 0) {
        throw new Error("카카오 로그인 중 문제가 발생했습니다.");
    }

    const { data: loginResponse, loading, error } = useApiFetch(() =>
        UserApiServicePublic.loginKakao(kakaoUserId)
    );

    useEffect(() => {
        if (loginResponse) {
            const accessToken = loginResponse.accessToken || '';
            const refreshToken = loginResponse.refreshToken || '';

            Cookies.set('polar-atk', accessToken, { expires: 7 });
            Cookies.set('polar-rtk', refreshToken, { expires: 7 });

            navigate('/');
        }
    }, [loginResponse, navigate])

    if (loading) return <div>로딩 중 입니다.</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>카카오 로그인 인증 중 입니다.</h1>
        </div>
    );
};

export default KakaoAuth;
