import { useState } from "react";
import './Menu.css';
import { Link } from "react-router-dom";

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
                    <li>
                        <Link to="/login">로그인</Link>
                    </li>
                    <li>
                        <Link to="/my/movie/reviews">내 영화 리뷰</Link>
                    </li>
                    <li>
                        <Link to="my/movie/likes">내 영화 좋아요</Link>
                    </li>
                    <li>
                        <Link to="my/movie/ratings">내 영화 평점</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
