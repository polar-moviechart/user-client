import { useCallback, useEffect, useState } from "react";
import Layout from "../../../../components/Layout";
import UserMovieApiServiceSecure from "../../../../apis/user/UserMovieApiServiceSecure";
import { useApiFetch } from "../../../../hooks/FetchApiFunc";
import Review from "../../../../apis/user/interfaces/Review";
import { createEmptyPage, Page } from "../../../../apis/movie/interfaces/Page";
import { ApiResponse } from "../../../../apis/ApiResponse";

const MyReviews = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const size: number = 10;

    const fetchReviews = useCallback(() => {
        return UserMovieApiServiceSecure.getMyReviews(page - 1, size);
    }, [page]);

    const pagedReview = useApiFetch<Page<Review[]>>(fetchReviews) || createEmptyPage<Review[]>();
    useEffect(() => {
        if (pagedReview && pagedReview.content.length > 0) {
            setReviews((prevReviews) => [...prevReviews, ...pagedReview.content]);
            if (pagedReview.content.length < size) {
                setHasMore(false);
            }
        }
    }, [pagedReview]);

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

    const handleTitleClick = (code: number) => {
        window.location.href = `/movie?code=${code}`;
    };

    return (
        <Layout>
            <div className="bg-white p-2 shadow-md w-full max-w-md border border-gray-400 mt-8">
                <p className="text-lg">
                    작성한 리뷰
                </p>
            </div>
            <div className="bg-white p-2 shadow-md w-full max-w-md border border-gray-400">
                <ul>
                    {reviews && reviews.map((review, index) => (
                        <li key={review.id}>
                            <p
                                className="truncate cursor-pointer text-blue-500 hover:underline hover:text-blue-700"
                                onClick={() => { handleTitleClick(review.code) }}
                            >
                                {review.title}
                            </p>
                            <p>{review.content}</p>
                            <p className="mb-3">작성일: {new Date(review.createdAt).toLocaleDateString()}</p>
                            {/* 리뷰 사이에 줄 추가 */}
                            {index < reviews.length - 1 && (
                                <hr className="my-2 border-gray-300" />
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}

export default MyReviews;
