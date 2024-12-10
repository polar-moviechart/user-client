import { useCallback } from "react";
import Layout from "../../../../components/Layout";
import UserMovieApiServiceSecure from "../../../../apis/user/UserMovieApiServiceSecure";
import { useApiFetch } from "../../../../hooks/FetchApiFunc";
import Review from "../../../../apis/user/interfaces/Review";

const MyReviews = () => {
    const fetchMyReviews = useCallback(() => {
        return UserMovieApiServiceSecure.getMyReviews();
    }, []);

    const { data: reviews } = useApiFetch<Review[]>(fetchMyReviews);

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
                    {reviews && reviews.map((review) => (
                        <li key={review.id}>
                            <p
                                className="truncate cursor-pointer text-blue-500 hover:underline hover:text-blue-700"
                                onClick={() => {handleTitleClick(review.code)}}
                            >
                                {review.title}
                            </p>
                            <p className="mb-3">{review.content}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}

export default MyReviews;