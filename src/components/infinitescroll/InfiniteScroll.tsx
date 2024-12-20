import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { useIntersectionObserver } from "./IntersectionObserver";

export type infiniteScrollHabndler = () => void;

export interface infiniteScrollProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    disabled?: boolean;
    rootMargin?: string;
    isLoading: boolean;
    onEnd?: infiniteScrollHabndler;
}

export default function InfiniteScroll({ disabled, rootMargin, onEnd, isLoading, children, ...props }: infiniteScrollProps): JSX.Element {
    const [domState, setDomState] = useState<HTMLDivElement | null>(null);

    useIntersectionObserver(
        domState,
        (entry) => {
            if (entry.isIntersecting && !isLoading) {
                onEnd?.();
            }
        },
        { rootMargin }
    );

    return (
        <div {...props}>
            {children}

            {children && !disabled ? <div ref={setDomState} style={{ width: '100%' }} /> : null}
        </div>
    )
};
