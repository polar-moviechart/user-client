import { fetchWithErrorHandling } from "../ApiServiceBase"
import { ApiResponse } from "../ApiResponse";
import { LoginResponse } from "./interfaces/LoginResponse";

export class UserApiServiceSecure {
    private static instance: UserApiServiceSecure | null = null;
    private static baseURL = process.env.REACT_APP_EDGE_SERVICE_URL + "/secure/api/v1/users";

    constructor() {
        if (!UserApiServiceSecure.instance) {
            UserApiServiceSecure.instance = new UserApiServiceSecure();
        }
        return UserApiServiceSecure.instance;
    }

    static async generateToken(rtk: string) {
        const response = await fetchWithErrorHandling<ApiResponse<String>>(
            `${this.baseURL}/generateToken`,
            "GET",
            { headers: { Authorization: `Bearer ${rtk}` } }
        );

        return response.data;
    }
};
