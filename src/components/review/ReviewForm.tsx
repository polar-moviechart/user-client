import { useState } from "react";

const ReviewForm = ({ addReview }) => {
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            addReview({ content, userId, date: new Date() });
            setContent(''); // 제출 후 textarea 비우기
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
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
                등록
            </button>
        </form>
    );
};

export default ReviewForm;