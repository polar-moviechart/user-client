'use client';

import BottomArea from "./BottomArea";
import HomeButton from "./HomeButton";
import SideBar from "./menu/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="bg-orange-300 min-h-screen flex flex-col">
                <header className="flex items-center justify-between p-4">
                    <HomeButton />
                    <SideBar />
                </header>

                {/* 메인 콘텐츠 영역 */}
                <main className="flex-grow flex flex-col items-center py-4 px-6">
                    {children}
                </main>

                {/* 하단 영역 */}
                <footer className="mt-auto">
                    <BottomArea />
                </footer>
            </div>
        </div>
    )
}
