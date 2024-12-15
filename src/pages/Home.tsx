import Layout from "../components/Layout";
import MovieCard from "../components/MovieCard";
import { MovieApiServicePublic } from "../apis/movie/MovieApiServicePublic";
import { useApiFetch } from "../hooks/FetchApiFunc";
import { useCallback } from "react";
import { ApiResponse } from "../apis/ApiResponse";
import { MovieInfoDto } from "../apis/movie/interfaces/MovieInfoDto";

export default function Home() {
  const targetDate: string = '2004-01-01';

  const fetchMovies = useCallback(() => {
    return MovieApiServicePublic.getMovies(targetDate);
  }, [targetDate]);

  const data = useApiFetch(fetchMovies) || [];

  return (
    <Layout>
      <div className="bg-orange-300 min-h-screen">
        {/* 탭 섹션 */}
        <div className="flex flex-col items-center space-y-8 mt-8">
          {data && data.map((movieInfo) => (
            <MovieCard key={movieInfo.code} movie={movieInfo} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
