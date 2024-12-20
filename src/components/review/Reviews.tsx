import { useCallback, useEffect, useState } from "react"
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import UserMovieApiServiceSecure from "../../apis/user/UserMovieApiServiceSecure";
import UserMovieApiServicePublic from "../../apis/user/UserMovieApiServicePublic";
import Review from "../../apis/user/interfaces/Review";
import { useApiFetch } from "../../hooks/FetchApiFunc";
import InfiniteScroll, { infiniteScrollHabndler } from "../infinitescroll/InfiniteScroll";
import { createEmptyPage, Page } from "../../apis/movie/interfaces/Page";
import { create } from "domain";

interface ReviewsProps {
    code: number;
}

const Reviews: React.FC<ReviewsProps> = ({ code }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const size: number = 10;

    // 리뷰 병합 및 정렬 함수 (중복 제거)
    const mergeReviews = (prevReviews: Review[], newReviews: Review[]) => {
        console.log('mergeReviews ', 'page: ', page - 1, 'isLoading: ', isLoading);
        setReviews((prevReviews) => [...prevReviews, ...newReviews])
    };

    const addReview = async (newReview: string): Promise<void> => {
        const response = await UserMovieApiServiceSecure.addReview(code, newReview);
        setReviews((prevReviews) => [response.data, ...prevReviews]);
    };

    const fetchReviews = useCallback(() => {
        return UserMovieApiServicePublic.getReviews(code, page - 1, size);
    }, [code, page]);

    const pagedData = useApiFetch<Page<Review[]>>(fetchReviews) || createEmptyPage<Review[]>();

    useEffect(() => {
        console.log("pagedData.content.length: ", pagedData?.content.length, " page: ", page - 1);
        if (pagedData.content.length > 0) {
            console.log('pagedData', pagedData.content.map((review) => review.content));
            setIsLoading(true);
            setReviews((prevReviews) => [...prevReviews, ...pagedData.content]);
        }
        if (pagedData?.last) {
            setHasMore(false);
        }
        setIsLoading(false);
    }, [pagedData]);

    // const loadMoreReviews = () => {
    //     if (hasMore && !isLoading) {
    //         setIsLoading(true);
    //         setPage((prevPage) => prevPage + 1);
    //     }
    // };

    const setNextPage = useCallback<infiniteScrollHabndler>(() => {
        console.log("setNextPage", ' isLoading: ',isLoading);
        if (hasMore) {
            setIsLoading(true);
            setPage((prevPage) => prevPage + 1);
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="container mx-auto">
            {/* 감상평 작성하기 */}
            <ReviewForm addReview={addReview} />
            {/* 감상평 목록 */}
            <InfiniteScroll
                onEnd={setNextPage}
                rootMargin="50px"
                isLoading={isLoading}
            >
                <ReviewList reviews={reviews} />
            </InfiniteScroll>
        </div>
    );
};

export default Reviews;
