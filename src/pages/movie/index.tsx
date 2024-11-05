import { useCallback, useEffect, useState } from "react";
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
import { StatType } from "../../apis/movie/type/StatType";
import { useApiFetch } from "../../hooks/FetchApiFunc";
import { MovieApiService } from "../../apis/movie/MovieApiService";
import Cookies from "js-cookie";
import { MovieInfoDto } from "../../apis/movie/interfaces/MovieInfoDto";
import { MovieStats } from "../../apis/movie/interfaces/MovieStats";

Chart.register(...registerables);

export default function Movie() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code: string = searchParams.get('code') || '';

  const [movieInfo, setMovieInfo] = useState<MovieInfoDto | null>(null);
  const [movieStats, setMovieStats] = useState<MovieStats[]>([]);

  const [ratingValue, setRatingValue] = useState(0); // 별점 값을 저장하는 state 추가

  const statType: StatType = 'RANKING';

  const fetchMovie = useCallback(() => MovieApiService.getMovie(code, Cookies.get('polar-atk') || ''), [code]);
  const fetchStats = useCallback(() => MovieApiService.getMovieStats(code, statType, 30), [code, statType]);

  const { data: movieData, loading: movieLoading, error: movieError } = useApiFetch(fetchMovie);
  const { data: statData, loading: statLoading, error: statError } = useApiFetch(fetchStats);

  useEffect(() => {
    if (movieData) {
      setMovieInfo(movieData);
    }
  }, [movieData]);

  useEffect(() => {
    if (statData) {
      setMovieStats(statData.statDtos)
    }
  }, [statData]);

  const cardWidth = "450px";
  const chartHeight = "250px";
  const dataPoints: DataPoint[] = transformStats(movieStats);
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

  if (movieError) return <p>{movieError}</p>
  if (statError) return <p>{statError}</p>
  if (movieLoading || statLoading) return <p>로딩 중입니다.</p>;

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
            {movieInfo && <MovieCard key={movieInfo?.code} movie={movieInfo} />}

            {/* 라인차트 표시 */}
            <div className="w-full width=" style={{ width: cardWidth, height: chartHeight }}>
              {/* {stats.length > 0 && (
                <LineChart data={chartData} width={cardWidth} height={chartHeight} />
              )} */}
              <Line data={dataset} />
            </div>

            <div className="bg-sky-200 flex flex-col items-center mt-4 mb-4">
              <p className="text-black">평점을 입력해주세요.</p>
              <StarRating code={Number(code)} initialRating={0} />
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
