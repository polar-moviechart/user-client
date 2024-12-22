import { useCallback, useEffect, useState } from "react"
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import UserMovieApiServiceSecure from "../../apis/user/UserMovieApiServiceSecure";
import UserMovieApiServicePublic from "../../apis/user/UserMovieApiServicePublic";
import Review from "../../apis/user/interfaces/Review";
import { useApiFetch } from "../../hooks/FetchApiFunc";
import InfiniteScroll, { infiniteScrollHabndler } from "../infinitescroll/InfiniteScroll";
import { createEmptyPage, Page } from "../../apis/movie/interfaces/Page";

interface ReviewsProps {
    code: number;
}

const Reviews: React.FC<ReviewsProps> = ({ code }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const size: number = 10;

    const addReview = async (newReview: string): Promise<void> => {
        const response = await UserMovieApiServiceSecure.addReview(code, newReview);
        setReviews((prevReviews) => [response.data, ...prevReviews]);
    };

    const fetchReviews = useCallback(() => {
        return UserMovieApiServicePublic.getReviews(code, page - 1, size);
    }, [code, page]);

    const { data: pagedData, isLoading: reviewLoading } = useApiFetch<Page<Review[]>>(fetchReviews) || createEmptyPage<Review[]>();

    useEffect(() => {
        if (!reviewLoading) {
            if (pagedData.content.length > 0) {
                setReviews((prevReviews) => [...prevReviews, ...pagedData.content]);
            }
        }
        if (pagedData.last) {
            setHasMore(false);
        }
    }, [pagedData]);

    // 무한 스크롤
    const setNextPage = useCallback<infiniteScrollHabndler>(() => {
        if (reviewLoading || !hasMore) return;

        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [reviewLoading]);

    return (
        <div className="container mx-auto">
            {/* 감상평 작성하기 */}
            <ReviewForm addReview={addReview} />
            {/* 감상평 목록 */}
            <InfiniteScroll
                onEnd={setNextPage}
                rootMargin="50px"
                isLoading={reviewLoading}
            >
                <ReviewList reviews={reviews} />
            </InfiniteScroll>
        </div>
    );
};

export default Reviews;
