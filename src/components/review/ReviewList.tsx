import Review from "../../apis/user/interfaces/Review";
import formatDate from "../FomatDate";

interface ReviewListProps {
    reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
    return (
        <div className="mt-2">
            {reviews && Array.isArray(reviews) && reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="mb-4">
                        <div className="text-gray-500 ml-5">
                            <p>{review.nickname}</p>
                            <p>{review.content}</p>
                            {/* <p>{formatDate(review.createdAt)}</p> */}
                            <p>{new Date(review.modifiedAt).toLocaleDateString()}</p>
                        </div>
                        {/* 리뷰 사이에 줄 추가 */}
                        {index < reviews.length - 1 && (
                            <hr className="my-2 border-gray-300" />
                        )}
                    </div>
                ))
            ) : (
                <p>감상평이 없습니다.</p>
            )}
        </div>
    );
};

export default ReviewList;