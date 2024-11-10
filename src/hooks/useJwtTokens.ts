import Cookies from "js-cookie"

export const useJwtTokens = () => {
    const atk: string | undefined = Cookies.get('polar-atk') || undefined;
    const rtk: string | undefined = Cookies.get('polar-rtk') || undefined;

    return { atk, rtk };
};
