import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";  // 쿼리 파라미터를 가져오기 위한 훅
import Layout from "../../components/Layout";
import StarRating from "./StarRating";
import MovieCard from "../../components/MovieCard";
import Reviews from "../../components/review/Reviews";
import moviesApi from "../../lib/moviesApi";
import transformStats from "./transformStats";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { DataPoint } from "../../components/chart/DataPoint";
import { Dataset } from "../../components/chart/Dataset";
import { MovieDailyAudience, MovieDailyRanking, MovieDailyRevenue, MovieDetailsDto } from "../../api/movie/data-contracts";

Chart.register(...registerables);

export default function Movie() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); // URL에서 쿼리 파라미터를 가져옴
  const code: number = Number(searchParams.get('code'));     // URL에서 'code' 파라미터 가져오기

  const [movieDto, setMovieDto] = useState<MovieDetailsDto | null>(null);
  type MovieDailyStat = MovieDailyAudience | MovieDailyRanking | MovieDailyRevenue;
  const [stats, setStats] = useState<MovieDailyStat[]>([]);

  const [ratingValue, setRatingValue] = useState(0); // 별점 값을 저장하는 state 추가
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieResponse = await moviesApi.getMovie(code);
        setMovieDto(movieResponse.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
      }
    };
    if (code) {
      fetchMovie();
    }
  }, [code]);

  useEffect(() => {
    const fetchMovieStats = async () => {
      try {
        const statsResponse = await moviesApi.getMovieStats(code, {
          limit: 10,
          field: 'RANKING',
        });
        const dailyStatsDtos = statsResponse.data.dailyStatsDtos || [];
        setStats(dailyStatsDtos);
      } catch (err) {
        setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
      }
    };
    if (code) {
      fetchMovieStats();
    }
  }, [code]);

  const cardWidth = "450px";
  const chartHeight = "250px";
  const dataPoints: DataPoint[] = transformStats(stats, 'ranking');
  const dataset: { labels: string[], datasets: Dataset[] } = {
    labels: dataPoints.map(point => point.x),
    datasets: [
      {
        type: 'line',
        label: '랭킹',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        data: dataPoints.map(point => point.y),
      },
    ],
  };
  

  if (error) return <p>에러 발생: {error}</p>;

  console.log(movieDto);
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        {/* 탭 섹션 */}
        <div className="flex justify-center space-x-4 py-4">
          <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md">
            최근 영화 별점
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md">
            전문가별 별점
          </button>
        </div>

        <div className="bg-lime-50 flex justify-center">
          {/* 영화 카드 섹션 */}
          <div className="bg-gray-200 flex flex-col items-center">
            {movieDto && <MovieCard key={movieDto?.code} movie={movieDto} />}

            {/* 라인차트 표시 */}
            <div className="w-full width=" style={{ width: cardWidth, height: chartHeight}}>
              {/* {stats.length > 0 && (
                <LineChart data={chartData} width={cardWidth} height={chartHeight} />
              )} */}
              <Line data={dataset} />
            </div>

            <div className="bg-sky-200 flex flex-col items-center mt-4 mb-4">
              <p className="text-black">평점을 입력해주세요.</p>
              <StarRating />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-[450px]">
            <Reviews />
          </div>
        </div>
      </div>
    </Layout>
  );
}
