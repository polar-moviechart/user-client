import { useCallback, useEffect, useState } from "react";
import Layout from "../../../../components/Layout";
import { useApiFetch } from "../../../../hooks/FetchApiFunc";
import { ApiResponse } from "../../../../apis/ApiResponse";
import { MovieInfoDto } from "../../../../apis/movie/interfaces/MovieInfoDto";
import { MovieApiServiceSecure } from "../../../../apis/movie/MovieApiServiceSecure";
import MovieCard from "../../../../components/MovieCard";

const MyLikes = () => {
    const [likedMovies, setLikedMovies] = useState<MovieInfoDto[] | null>(null);

    const fetchMyLikeMovies = useCallback((): Promise<ApiResponse<MovieInfoDto[]>> =>
        MovieApiServiceSecure.getLikedMovie(), []);
    const { data: fetchLikedMovies, isLoading: likedMoviesLoaded} = useApiFetch<MovieInfoDto[]>(fetchMyLikeMovies) || [];
    useEffect(() => {
        if (fetchLikedMovies) {
            setLikedMovies(fetchLikedMovies)
        }
    }, [fetchLikedMovies, likedMovies]);

    return (
        <Layout>
            <div className="bg-white p-2 shadow-md w-full max-w-md border border-gray-400 mt-8">
                <p className="text-lg">
                    좋아요한 영화
                </p>
            </div>
            <div className="flex flex-col items-center space-y-8 mt-8">
                {likedMovies && likedMovies.map((likedMovie) => (
                    <MovieCard key={likedMovie.code} movie={likedMovie} />
                ))}
            </div>
        </Layout>
    );
}

export default MyLikes;