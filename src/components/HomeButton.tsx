"use client";

import { Link } from "react-router-dom";

export default function HomeButton() {
    return (
        <div className="fixed top-4 left-4">
            <Link to="/" className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md font-semibold">
                홈페이지로 이동
            </Link>
        </div>
    )
}