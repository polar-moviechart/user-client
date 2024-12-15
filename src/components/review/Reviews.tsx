import { useEffect, useState } from "react"
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import UserMovieApiServiceSecure from "../../apis/user/UserMovieApiServiceSecure";
import UserMovieApiServicePublic from "../../apis/user/UserMovieApiServicePublic";
import Review from "../../apis/user/interfaces/Review";

interface ReviewsProps {
    code: number;
  }

const Reviews: React.FC<ReviewsProps> = ({ code }) => {
    const [reviews, setReview] = useState<Review[]>([]);

    const addReview = async (newReview: string): Promise<void> => {
        const response = await UserMovieApiServiceSecure.addReview(code, newReview);
        console.log(response);
        setReview((prevReviews) => [response.data, ...prevReviews]);
    };


    useEffect(() => {
        const fetchReviews = async () => {
            // 초기 데이터
            const response = await UserMovieApiServicePublic.getReviews(code)
            setReview(response.data);
        };

        fetchReviews();
    }, [code]);

    return (
        <div className="container mx-auto">
            {/* 감상평 작성하기 */}
            <ReviewForm addReview={addReview} />
            {/* 감상평 목록 */}
            <ReviewList reviews={reviews} />
        </div>
    );
};

export default Reviews;
