import { useCallback, useEffect, useState } from "react";
import Layout from "../../../../components/Layout";
import { useApiFetch } from "../../../../hooks/FetchApiFunc";
import { MovieInfoDto } from "../../../../apis/movie/interfaces/MovieInfoDto";
import { MovieApiServiceSecure } from "../../../../apis/movie/MovieApiServiceSecure";
import MovieCard from "../../../../components/MovieCard";
import InfiniteScroll, { infiniteScrollHabndler } from "../../../../components/infinitescroll/InfiniteScroll";
import { createEmptyPage, Page } from "../../../../apis/movie/interfaces/Page";

const MyLikes = () => {
    const [likedMovies, setLikedMovies] = useState<MovieInfoDto[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const size: number = 10;

    const fetchMyLikeMovies = useCallback(() => {
        return MovieApiServiceSecure.getLikedMovie(page -1, size)
    }, [page]);

    const { data: fetchLikedMovies, isLoading: movieLoading } = useApiFetch<Page<MovieInfoDto[]>>(fetchMyLikeMovies) || createEmptyPage<MovieInfoDto[]>();
    useEffect(() => {
        if (!movieLoading) {
            if (fetchLikedMovies) {
                setLikedMovies((prevData) => [...prevData, ...fetchLikedMovies.content]);
            }
            if (fetchLikedMovies.last) {
                setHasMore(false);
            }
        }
    }, [fetchLikedMovies]);

    const setNextPage = useCallback<infiniteScrollHabndler>(() => {
        if (movieLoading || !hasMore) return;

        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [fetchLikedMovies]);

    return (
        <Layout>
            <div className="bg-white p-2 shadow-md w-full max-w-md border border-gray-400 mt-8">
                <p className="text-lg">
                    좋아요한 영화
                </p>
            </div>
            <div className="flex flex-col items-center space-y-8 mt-8">
                <InfiniteScroll
                    onEnd={setNextPage}
                    rootMargin="50px"
                    isLoading={movieLoading}
                >
                    {likedMovies && likedMovies.map((likedMovie) => (
                        <MovieCard key={likedMovie.code} movie={likedMovie} />
                    ))}
                </InfiniteScroll>
            </div>
        </Layout>
    );
}

export default MyLikes;