import { ApiResponse } from "../apis/ApiResponse";
import GenerateTokenRes from "../apis/user/interfaces/GenerateTokenRes";
import { UserApiServiceSecure } from "../apis/user/UserApiServiceSecure";
import { FetchApiFunc } from "../types/FetchApiFunc";
import { setAtk } from "../utils/authUtils";

export const refreshTokenAndRetry = async <T>(rtk: string | undefined, apiFunc: FetchApiFunc<T>) => {
    // console.log("refreshTokenAndRetry");
    const tokenResponse: ApiResponse<GenerateTokenRes> = await UserApiServiceSecure.generateToken(rtk);
    setAtk(tokenResponse.data.accessToken);
    // console.log("atk refreshed, atk = " + tokenResponse.data);
    return await apiFunc();
};
