import Layout from "../components/Layout";
import MovieCard from "../components/MovieCard";
import { MovieApiServicePublic } from "../apis/movie/MovieApiServicePublic";
import { useApiFetch } from "../hooks/FetchApiFunc";
import { useCallback, useEffect } from "react";
import { useJwtTokens } from "../hooks/useJwtTokens";

export default function Home() {
  const { atk: atk, rtk: rtk } = useJwtTokens();
  const targetDate: string = '2004-01-01';

  const fetchMovies = useCallback(() => {
    return MovieApiServicePublic.getMovies(targetDate);
  }, [targetDate, atk]);

  const { data: movieInfos, loading, error } = useApiFetch(fetchMovies);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  if (loading) return <div>로딩 중 입니다.</div>;
  if (error) return <div></div>;

  return (
    <Layout>
      <div className="bg-orange-300 min-h-screen">
        {/* 탭 섹션 */}
        <div className="flex flex-col items-center space-y-8 mt-8">
          {movieInfos && movieInfos.map((movieInfo) => (
            <MovieCard key={movieInfo.code} movie={movieInfo} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
