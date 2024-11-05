import { fetchWithErrorHandling } from "../ApiServiceBase"
import { ApiResponse } from "../ApiResponse";
import { LoginResponse } from "./interfaces/LoginResponse";

export class UserApiService {
    private static instance: UserApiService | null = null;
    private static baseURL = process.env.REACT_APP_EDGE_SERVICE + "/api/v1/users";

    constructor() {
        if (!UserApiService.instance) {
            UserApiService.instance = new UserApiService();
        }
        return UserApiService.instance;
    }

    static async generateToken(rtk: string) {
        const response = await fetchWithErrorHandling<ApiResponse<String>>(
            `${this.baseURL}/generateToken`,
            "GET",
            { headers: { Authorization: `Bearer ${rtk}` } }
        );

        return response.data;
    }

    static async loginKakao(kakaoId: number) {
        const response = await fetchWithErrorHandling<ApiResponse<LoginResponse>>(
            `${this.baseURL}/login/kakao`,
            "POST",
            { data: kakaoId }
        );

        return response.data;
    }
};
