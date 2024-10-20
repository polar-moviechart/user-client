import { useEffect, useState } from "react"
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

interface Review {
    user: string;
    userId: number;
    content: string;
    rating: number;
    date: Date;
}

const Reviews = () => {
    const [reviews, setReview] = useState<Review[]>([]);

    const addReview = (newReview: Review) => {
        setReview([newReview, ...reviews]);
    };

    useEffect(() => {
        // 초기 데이터
        const initialReviews: Review[] = [
            {
                user: 'sira****',
                userId: 1,
                content: '올해 본 영화 중 최고의 영화였다!',
                rating: 10,
                date: new Date('2024-10-01T12:09:00'),
            },
            {
                user: 'dizl****',
                userId: 2,
                content: '프로그래밍을 넘어서 마음의 연결',
                rating: 10,
                date: new Date('2024-10-01T10:23:00'),
            },
        ];

        setReview(initialReviews);
    }, []);

    return (
        <div className="container mx-auto">
            {/* <h2 className="text-xl font-bold mb-4">감상평 작성하기</h2> */}
            <ReviewForm addReview={addReview} />
            {/* <h2 className="text-xl fonr-bold mt-6">감상평 목록</h2> */}
            <ReviewList reviews={reviews} />
        </div>
    );
};

export default Reviews;