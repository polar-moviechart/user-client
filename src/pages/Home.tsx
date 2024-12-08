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
    return MovieApiServicePublic.getMovies(targetDate, atk);
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
        <div className="flex justify-center space-x-4 py-4">
          <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md">
            최근 영화 별점
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md">
            전문가별 별점
          </button>
        </div>
        <div className="flex flex-col items-center space-y-8 mt-8">
          {movieInfos && movieInfos.map((movieInfo) => (
            <MovieCard key={movieInfo.code} movie={movieInfo} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
