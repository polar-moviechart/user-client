import { UserApiServiceSecure } from "../apis/user/UserApiServiceSecure";
import { FetchApiFunc } from "../types/FetchApiFunc";
import { setAtk } from "../utils/authUtils";

export const refreshTokenAndRetry = async <T>(rtk: string | undefined, apiFunc: FetchApiFunc<T>) => {
    const tokenResponse = await UserApiServiceSecure.generateToken(rtk);
    setAtk(tokenResponse.data);
    return await apiFunc();
};
