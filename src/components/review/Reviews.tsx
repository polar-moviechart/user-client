import { useCallback, useEffect, useState } from "react"
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import UserMovieApiServiceSecure from "../../apis/user/UserMovieApiServiceSecure";
import UserMovieApiServicePublic from "../../apis/user/UserMovieApiServicePublic";
import Review from "../../apis/user/interfaces/Review";
import { useApiFetch } from "../../hooks/FetchApiFunc";
import { createEmptyPage, Page } from "../../apis/movie/interfaces/Page";

interface ReviewsProps {
    code: number;
}

const Reviews: React.FC<ReviewsProps> = ({ code }) => {
    const [reviews, setReview] = useState<Review[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const size: number = 10;

    const addReview = async (newReview: string): Promise<void> => {
        const response = await UserMovieApiServiceSecure.addReview(code, newReview);
        setReview((prevReviews) =>
            (Array.isArray(prevReviews) ? [response.data, ...prevReviews] : [response.data]));
    };

    const fetchReviews = useCallback(() => {
        return UserMovieApiServicePublic.getReviews(code, page-1, size);
    }, [page, code]);

    const pagedData = useApiFetch<Page<Review[]>>(fetchReviews) || createEmptyPage<Review[]>();

    useEffect(() => {
        if (pagedData && pagedData.content.length > 0) {
            setReview((prevReview) => [...prevReview, ...pagedData.content]);
            if (pagedData.content.length < size) {
                setHasMore(false);
            }
        }
    }, [pagedData]);

    const handleScroll = () => {
        const bottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight;
        if (bottom && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasMore]);

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
