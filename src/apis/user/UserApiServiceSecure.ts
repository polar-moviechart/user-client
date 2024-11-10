import { fetchWithErrorHandling } from "../ApiServiceBase"
import { ApiResponse } from "../ApiResponse";
import { getAuthHeaders } from "../../utils/authUtils";

export class UserApiServiceSecure {
    private static instance: UserApiServiceSecure | null = null;
    private static baseURL = process.env.REACT_APP_EDGE_SERVICE_URL + "/secure/api/v1/users";

    constructor() {
        if (!UserApiServiceSecure.instance) {
            UserApiServiceSecure.instance = new UserApiServiceSecure();
        }
        return UserApiServiceSecure.instance;
    }

    static async generateToken(rtk: string | undefined) {
        const response = await fetchWithErrorHandling<ApiResponse<string>>(
            `${this.baseURL}/generateToken`,
            "GET",
            { headers: getAuthHeaders(rtk) }
        );

        return response.data;
    }
};
