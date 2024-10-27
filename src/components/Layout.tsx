'use client';

import BottomArea from "./BottomArea";
import HomeButton from "./HomeButton";
import SideBar from "./menu/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="bg-orange-300 min-h-screen">
                <HomeButton />
                <SideBar />
                {/* 탭 섹션 */}
                <div className="flex flec-col justify-center space-x-4 py-4">
                    <main>{children}</main>
                </div>
                <BottomArea />
            </div>
        </div>
    )
}
