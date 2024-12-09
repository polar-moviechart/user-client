import { fetchWithErrorHandling } from "../ApiServiceBase"
import { getAuthHeaders } from "../../utils/authUtils";
import { ApiResponse } from "../ApiResponse";
import GenerateTokenRes from "./interfaces/GenerateTokenRes";

export class UserApiServiceSecure {
    private static instance: UserApiServiceSecure | null = null;
    private static baseURL = process.env.REACT_APP_EDGE_SERVICE_URL + "/secure/api/v1/users";

    constructor() {
        if (!UserApiServiceSecure.instance) {
            UserApiServiceSecure.instance = new UserApiServiceSecure();
        }
        return UserApiServiceSecure.instance;
    }

    static async generateToken(rtk: string | undefined): Promise<ApiResponse<GenerateTokenRes>> {
        const response: ApiResponse<GenerateTokenRes> = await fetchWithErrorHandling<GenerateTokenRes>(
            `${this.baseURL}/generateToken`,
            "POST",
            { headers: getAuthHeaders(rtk) }
        );

        return response;
    }
};
