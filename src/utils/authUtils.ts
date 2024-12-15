import Cookies from "js-cookie";

export const useJwtTokens = () => {
    const atk: string | undefined = Cookies.get('polar-atk') || undefined;
    const rtk: string | undefined = Cookies.get('polar-rtk') || undefined;

    return { atk, rtk };
};


export function getAuthHeaders(token: string | null | undefined): Record<string, string> {
    if (token !== undefined) {
        return { Authorization: `Bearer ${token}` };
    }
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

export function getAtk(): string | null {
    return Cookies.get('polar-atk') || null;
}

export function getRtk(): string | null {
    return Cookies.get('polar-rtk') || null;
}

export function setAtk(atk: string) {
    if (atk) {
        Cookies.set('polar-atk', atk, { expires: 7 });
    }
};

export function setRtk(rtk: string) {

    if (rtk) {
        Cookies.set('polar-rtk', rtk, { expires: 7 });
    }
};
export function clearTokens() {
    Cookies.remove('polar-atk');
    Cookies.remove('polar-rtk');
}

