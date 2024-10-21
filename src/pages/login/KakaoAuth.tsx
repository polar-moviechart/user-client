import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const KakaoAuth = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    useEffect(() => {
        if (code) {
            console.log("인증코드: " + code);

            fetch('http://localhost:8080/api/kakao/callback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('서버 응답: ', data);
                })
                .catch(error => {
                    console.error('에러 발생: ', error);
                });
        }
    }, [code]);

    return (
        <div>
            <h1>Kakao 인증 중...</h1>
        </div>
    );
};

export default KakaoAuth;