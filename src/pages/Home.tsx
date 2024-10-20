import { useEffect, useState } from "react";
import { MovieDto } from "../api/data-contracts";
import moviesApi from "../lib/moviesApi";
import Layout from "../components/Layout";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [movieDtos, setMovieDtos] = useState<MovieDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  const targetDate: string = '2004-01-01';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await moviesApi.getMovies({
          targetDate: targetDate,
          page: 0,
          size: 10,
        });

        const movieDtos: MovieDto[] = response.data;
        setMovieDtos(movieDtos);
      } catch (err) {
        setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
      }
    };

    fetchMovies();
  }, [targetDate]);

  if (error) return <p>에러 발생: {error}</p>;

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
          {movieDtos && movieDtos.map((movieDto) => (
            <MovieCard key={movieDto.code} movie={movieDto} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
