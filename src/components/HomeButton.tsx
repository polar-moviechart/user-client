"use client";

import { Link, useLocation, useNavigate } from "react-router-dom";

export default function HomeButton() {
    const navigate = useNavigate(); // navigate 훅을 사용하여 페이지 이동
    const location = useLocation();

    const handleClick = () => {
        if (location.pathname === "/") {
            window.location.reload();
        } else {
            navigate("/");
        }
    };

    return (
        <div className="fixed top-4 left-4">
            <button
                className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md font-semibold"
                onClick={handleClick}
            >
                홈페이지로 이동
            </button>
        </div>
    );
}
