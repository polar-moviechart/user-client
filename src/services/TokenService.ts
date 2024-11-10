import { UserApiServiceSecure } from "../apis/user/UserApiServiceSecure";
import { FetchApiFunc } from "../types/FetchApiFunc";
import { setAuthHeaders } from "../utils/authUtils";

export const refreshTokenAndRetry = async <T>(rtk: string | undefined, apiFunc: FetchApiFunc<T>) => {
    const tokenResponse = await UserApiServiceSecure.generateToken(rtk);
    setAuthHeaders(undefined, rtk);
    return await apiFunc();
};
