'use client';

import BottomArea from "./BottomArea";
import HomeButton from "./HomeButton";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <HomeButton />
            <main>{children}</main>
            <BottomArea />
        </div>
    )
}
