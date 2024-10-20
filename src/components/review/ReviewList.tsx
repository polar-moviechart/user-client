import formatDate from "../FomatDate";


const ReviewList = ({ reviews }) => {
    return (
        <div className="mt-4">
            {reviews && Array.isArray(reviews) && reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="text-gray-500 ml-5">
                        <p>{review.rating} 점</p>
                        <p>{review.content}</p>
                        <p>{review.user} {formatDate(review.date)}</p>
                    </div>
                ))
            ) : (
                <p>감상평이 없습니다.</p>
            )};
        </div>
    );
};

export default ReviewList;