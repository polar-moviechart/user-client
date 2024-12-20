import { useEffect } from "react";

export type UseIntersectionObserverCallback = (
    entry: IntersectionObserverEntry
) => void;

export function useIntersectionObserver(
    ref: Element | string | null,
    callback: UseIntersectionObserverCallback,
    options: IntersectionObserverInit
): void {
    useEffect(() => {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(callback);
        }, options);

        if (ref) {
            if (typeof ref === "string") {
                const tag = document.querySelector(ref);
                if (tag) {
                    io.observe(tag);
                }
            } else {
                io.observe(ref);
            }
        }

        return () => {
            io.disconnect();
        };
    }, [ref, callback, options]);
};
