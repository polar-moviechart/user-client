import { useState } from "react";
import './Menu.css';
import { Link } from "react-router-dom";
import useModal from "../../hooks/UseModal";
import { getRtk } from "../../utils/authUtils";
import CustomModal from "../CustomModal";

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

    const { modalState, openModal, closeModal, onConfirm } = useModal();
    const handleClick = (path: string) => {
        const rtk = getRtk();
        if (!rtk) {
            openModal(
                '로그인 필요',
                '로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?'
            );
        } else {
            window.location.href = path;
        }
    }

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
                        <span onClick={() => handleClick('my/movie/reviews')}>내 영화 리뷰</span>
                    </li>
                    <li>
                        <span onClick={() => handleClick('my/movie/likes')}>내 영화 좋아요</span>
                        {/* <Link to="my/movie/likes">내 영화 좋아요</Link> */}
                    </li>
                    <li>
                        <span onClick={() => handleClick('my/movie/ratings')}>내 영화 평점</span>
                        {/* <Link to="my/movie/ratings">내 영화 평점</Link> */}
                    </li>
                </ul>
            </div>
            <CustomModal
                title={modalState.title}
                message={modalState.message}
                onConfirm={onConfirm}
                onCancel={closeModal}
                isOpen={modalState.isOpen}
            />
        </div>
    );
};

export default SideBar;
