import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import usersApi from "../../lib/usersApi";
import { KakaoCodeDto } from "../../api/user/data-contracts";

const KakaoAuth = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    useEffect(() => {
        if (code) {
            console.log("인증코드: " + code);
            const fetchLogin = async () => {
                try {
                    const kakaoCodeDto: KakaoCodeDto = { code };
                    const response = await usersApi.kakaoLogin(kakaoCodeDto);
                    console.log('서버 응답: ', response);
                } catch (error) {
                    console.log('에러 발생: ', error);
                }
            };

            fetchLogin();
        }
    }, [code]);ç

    return (
        <div>
            <h1>Kakao 인증 중...</h1>
        </div>
    );
};

export default KakaoAuth;