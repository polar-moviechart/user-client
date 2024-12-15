import axios from "axios";
import { ApiResponse } from "../ApiResponse";
import { LoginResponse } from "./interfaces/LoginResponse";

export class UserApiServicePublic {
    private static instance: UserApiServicePublic | null = null;
    private static baseURL = process.env.REACT_APP_EDGE_SERVICE_URL + "/public/api/v1/users";

    constructor() {
        if (!UserApiServicePublic.instance) {
            UserApiServicePublic.instance = new UserApiServicePublic();
        }
        return UserApiServicePublic.instance;
    }

    static async loginKakao(kakaoId: number): Promise<ApiResponse<LoginResponse>> {
        console.log('kakaoId = ', kakaoId);
        return await axios.post(`${this.baseURL}/login/kakao`,
            { id: kakaoId })
            .then((response) => { return response.data });;
    }
};
