import { useEffect, useRef, useState } from "react";
import './Menu.css';

const SideBar = ({ width = 280 }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [xPosition, setX] = useState(-width);

    const toggleMenu = () => {
        if (xPosition < 0) {
            setX(0);
            setIsMenuOpen(true);
        } else {
            setX(-width);
            setIsMenuOpen(false);
        }
    };

    return (
        <div>
            <button onClick={toggleMenu} className="menu-button">
                ☰
            </button>
            <div className={`menu ${isMenuOpen ? 'open' : 'closed'}`}>
                <ul>
                    {isMenuOpen
                        ? <span onClick={toggleMenu}> X 닫기 </span>
                        : null
                    }
                    <li>로그인</li>
                    <li>리뷰 목록</li>
                    <li>내 영화</li>
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
