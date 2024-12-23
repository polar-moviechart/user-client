import { useCallback, useEffect, useState } from "react"
import { MovieRatingRes } from "../../../../apis/user/interfaces/MovieRatingRes";
import { MovieApiServiceSecure } from "../../../../apis/movie/MovieApiServiceSecure";
import { useApiFetch } from "../../../../hooks/FetchApiFunc";
import { createEmptyPage, Page } from "../../../../apis/movie/interfaces/Page";
import InfiniteScroll, { infiniteScrollHabndler } from "../../../../components/infinitescroll/InfiniteScroll";
import Layout from "../../../../components/Layout";

const MyRatings = () => {
    const [ratedMovies, setRatedMovies] = useState<MovieRatingRes[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const size: number = 10;

    const fetchRatedMovies = useCallback(() => {
        return MovieApiServiceSecure.getRatedMovie(page - 1, size)
    }, [page]);

    const { data: ratingResponse, isLoading: movieLoading } = useApiFetch<Page<MovieRatingRes[]>>(fetchRatedMovies) || createEmptyPage<MovieRatingRes[]>();
    useEffect(() => {
        if (!movieLoading) {
            if (ratingResponse) {
                setRatedMovies((prevData) => [...prevData, ...ratingResponse.content]);
            }
            if (ratingResponse.last) {
                setHasMore(false);
            }
        }
    }, [ratingResponse]);

    const handleTitleClick = (code: number) => {
        window.location.href = `/movie?code=${code}`;
    };

    const setNextPage = useCallback<infiniteScrollHabndler>(() => {
        if (movieLoading || !hasMore) return;

        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [ratingResponse]);

    return (
        <Layout>
            <InfiniteScroll
                onEnd={setNextPage}
                rootMargin="50px"
                isLoading={movieLoading}
            >
                <div className="bg-white p-2 shadow-md w-full max-w-md border border-gray-400 mt-8">
                    <p className="text-lg">
                        평가한 영화
                    </p>
                </div>
                <div className="bg-white p-2 shadow-md w-full max-w-md border border-gray-400">
                    <ul>
                        {ratedMovies && ratedMovies.map((ratedMovie, index) => (
                            <li key={index}>
                                <p
                                    className="truncate cursor-pointer text-blue-500 hover:underline hover:text-blue-700"
                                    onClick={() => { handleTitleClick(ratedMovie.movieCode) }}
                                >
                                    {ratedMovie.title}
                                </p>
                                <p>내 평점: {ratedMovie.movieRating}</p>
                                <p className="mb-3">작성일: {new Date(ratedMovie.createdAt).toLocaleDateString()}</p>
                                {/* 평점 사이에 줄 추가 */}
                                {!movieLoading && index < ratedMovies.length - 1 && (
                                    <hr className="my-2 border-gray-300" />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </InfiniteScroll>
        </Layout>
    );
}

export default MyRatings;