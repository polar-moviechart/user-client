import Layout from "../../components/Layout";

const KakaoLogin = () => {
    const restApiKey = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const origin = process.env.REACT_APP_EDGE_SERVICE_URL;
    const redirectUrl = `${origin}/public/api/edge/users/kakao/login/callback`;

    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUrl}&response_type=code`;
    const handleLogin = () => {
        window.location.href = kakaoUrl
    }
    return (
        <>
            <Layout>
                <div className="flex flex-col justify-center items-center h-96">
                    <button onClick={handleLogin}>
                        <img
                            src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                            width="200"
                            alt="카카오 로그인 버튼"
                        />
                    </button>
                </div>
            </Layout>
        </>
    )
}

export default KakaoLogin;
