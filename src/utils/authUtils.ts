import Cookies from "js-cookie";

export function getAuthHeaders(token: string | null | undefined): Record<string, string> {
    if (token !== undefined) {
        console.log("token = ", token);
        return { Authorization: `Bearer ${token}` };
    }
    console.log("token = ", token);
    return {};
};

export function setAuthHeaders(
    atk: string | null | undefined,
    rtk: string | null | undefined) {
    if (atk) {
        Cookies.set('polar-atk', atk, { expires: 7 });
    }

    if (rtk) {
        Cookies.set('polar-rtk', rtk, { expires: 7 });
    }
};
