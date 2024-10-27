import Layout from "../../components/Layout";

const KakaoLogin = () => {
    const restApiKey = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const redirectUrl = "http://localhost:8082/api/v1/users/kakao/login/callback";

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
