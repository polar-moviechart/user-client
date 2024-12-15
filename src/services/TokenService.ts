import { ApiResponse } from "../apis/ApiResponse";
import GenerateTokenRes from "../apis/user/interfaces/GenerateTokenRes";
import { UserApiServiceSecure } from "../apis/user/UserApiServiceSecure";

export const refreshToken = async (rtk: string | undefined) => {
    const tokenResponse: ApiResponse<GenerateTokenRes> = await UserApiServiceSecure.generateToken(rtk);
    return tokenResponse.data.accessToken;
};
