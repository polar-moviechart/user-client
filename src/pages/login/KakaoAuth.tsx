import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const KakaoAuth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParam = new URLSearchParams(location.search);

    const kakaoUserId = Number(searchParam.get('id') ?? '0');
    if (kakaoUserId === 0) {
        throw new Error("카카오 로그인 중 문제가 발생했습니다.");
    }



    useEffect(() => {
        const loginKakao = async (id) => {
            try {
                const kakaoUserInfoDto = { id: kakaoUserId };
                console.log("kakaoUserId = " + kakaoUserId);

                // axios로 직접 user-service의 로그인 API 호출
                const response = await axios.post(
                    `${process.env.REACT_APP_EDGE_SERVICE_URL}/api/v1/users/login/kakao`,
                    kakaoUserInfoDto,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                );

                const body = response.data.data;
                const accessToken = body.accessToken || '';
                const refreshToken = body.refreshToken || '';

                Cookies.set('polar-atk', accessToken, { expires: 7 });
                Cookies.set('polar-rtk', refreshToken, { expires: 7 });

                navigate('/');
            } catch (error) {
                console.error("로그인 중 에러가 발생했습니다:", error);
            }
        };

        loginKakao(kakaoUserId);
    }, [kakaoUserId, navigate]);

    return (
        <div>
            <h1>카카오 로그인 인증 중 입니다.</h1>
        </div>
    );
};

export default KakaoAuth;
