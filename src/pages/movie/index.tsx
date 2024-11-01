import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";  // 쿼리 파라미터를 가져오기 위한 훅
import Layout from "../../components/Layout";
import StarRating from "./StarRating";
import MovieCard from "../../components/MovieCard";
import Reviews from "../../components/review/Reviews";
import transformStats from "./transformStats";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { DataPoint } from "../../components/chart/DataPoint";
import { Dataset } from "../../components/chart/Dataset";
import { MovieInfoDto } from "../../interfaces/MovieInfoDto";
import { MovieDailyAudience } from "../../interfaces/MovieDailyAudience";
import { MovieDailyRanking } from "../../interfaces/MovieDailyRanking";
import { MovieDailyRevenue } from "../../interfaces/MovieDailyRevenue";
import { ApiResponse } from "../../interfaces/ApiResponse";
import axios from "axios";

Chart.register(...registerables);

export default function Movie() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); // URL에서 쿼리 파라미터를 가져옴
  const code: number = Number(searchParams.get('code'));     // URL에서 'code' 파라미터 가져오기

  const [movieInfoDto, setMovieInfoDto] = useState<MovieInfoDto | null>(null);
  type MovieDailyStat = MovieDailyAudience | MovieDailyRanking | MovieDailyRevenue;
  const [movieDailyStats, setMovieDailyStats] = useState<MovieDailyStat[]>([]);

  const [ratingValue, setRatingValue] = useState(0); // 별점 값을 저장하는 state 추가
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const movieResponse = await axios.get(`${process.env.REACT_APP_EDGE_SERVICE_URL}/api/v1/movies/${code}`)
      const data: MovieInfoDto = movieResponse.data;
      setMovieInfoDto(data);
    };

    fetchMovie();
  }, [code]);

  useEffect(() => {
    const fetchMovieDailyStats = async () => {
      const movieDailyStats: ApiResponse<MovieDailyStat[]> = await axios.get(`${process.env.REACT_APP_EDGE_SERVICE_URL}/api/v1/movies/${code}/stats}`,
        {
          params: {
            limit: 10,
            field: 'RANKING'
          }
        }
      );
      setMovieDailyStats(movieDailyStats.data);
    };

    fetchMovieDailyStats();
  }, []);

  const cardWidth = "450px";
  const chartHeight = "250px";
  const dataPoints: DataPoint[] = transformStats(movieDailyStats, 'ranking');
  const dataset: { labels: Date[], datasets: Dataset[] } = {
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
            {movieInfoDto && <MovieCard key={movieInfoDto?.code} movie={movieInfoDto} />}

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
