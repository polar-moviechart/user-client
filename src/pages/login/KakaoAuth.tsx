import { useLocation, useNavigate } from "react-router-dom";
import usersApiInstance from "../../lib/usersApi";
import { useEffect } from "react";
import { KakaoUserInfoDto, TokenResponse } from "../../api/user/data-contracts";
import Cookies from "js-cookie";

const KakaoAuth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParam = new URLSearchParams(location.search);

    const kakaoUserId = Number(searchParam.get('id') ?? '0');
    if (kakaoUserId === 0) {
        throw new Error("카카오 로그인 중 문제가 발생했습니다.");
    }

    const userApi = usersApiInstance;
    useEffect(() => {
        const loginKakao = async (id) => {
            const kakaoUserInfoDto: KakaoUserInfoDto = {
                id: kakaoUserId
            }
            const response = await userApi.kakaoLogin(kakaoUserInfoDto)
            const body: TokenResponse = {
                accessToken: response.data?.data?.accessToken ?? '',
                refreshToken: response.data?.data?.refreshToken ?? ''
            };
            Cookies.set('polar-ark', body.accessToken || '', { expires: 7 });
            Cookies.set('polar-rtk', body.refreshToken || '', { expires: 7 });

            navigate('/');
        };
        loginKakao(kakaoUserId);
    }, [kakaoUserId, navigate]);

    return (
        <div>
            <h1>카카로 로그인 인증 중 입니다.</h1>
        </div>
    )
};


export default KakaoAuth;
