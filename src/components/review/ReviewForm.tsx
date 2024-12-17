import { useState } from "react";
import useModal from "../../hooks/UseModal";
import { getRtk } from "../../utils/authUtils";
import CustomModal from "../CustomModal";

const ReviewForm = ({ addReview }) => {
    const [content, setContent] = useState('');
    const { modalState, openModal, closeModal, onConfirm } = useModal();

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (content.trim()) {
            addReview(content);
            setContent(''); // 제출 후 textarea 비우기
        }
    }

    function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();
        const rtk = getRtk();
        if (!rtk) {
            openModal(
                '로그인 필요',
                '로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?',
            );
        } else {
            handleSubmit()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="my-4 p-4 border rounded">
            <div className="mb-2">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border p-2 w-full text-black"
                    placeholder="감상평을 작성해주세요"
                />
            </div>
            <button
                type="button" className="bg-green-500 text-white py-2 px-4 rounded"
                onClick={handleClick}>
                등록
            </button>
            <CustomModal
                title={modalState.title}
                message={modalState.message}
                onConfirm={onConfirm}
                onCancel={closeModal}
                isOpen={modalState.isOpen}
            />
        </form>
    );
};

export default ReviewForm;