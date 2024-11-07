import Cookies from "js-cookie"

export const useJwtTokens = () => {
    const atk: string = Cookies.get('polar-atk') || '';
    const rtk: string = Cookies.get('polar-rtk') || '';

    return { atk, rtk };
};
