import axios from "axios";
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
        const headers = {
            Authorization: `Bearer ${rtk}`,
        };
        return axios.post(`${this.baseURL}/generateToken`,
            {},
            { headers: headers }
        ).then((response) => {return response.data});;
    }
};
