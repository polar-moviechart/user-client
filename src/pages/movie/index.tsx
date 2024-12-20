import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";  // 쿼리 파라미터를 가져오기 위한 훅
import Layout from "../../components/Layout";
import StarRating from "./StarRating";
import MovieCard from "../../components/MovieCard";
import transformStats from "./transformStats";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { DataPoint } from "../../components/chart/DataPoint";
import { Dataset } from "../../components/chart/Dataset";
import { StatType } from "../../apis/movie/type/StatType";
import { useApiFetch } from "../../hooks/FetchApiFunc";
import { MovieApiServicePublic } from "../../apis/movie/MovieApiServicePublic";
import { MovieInfoDto } from "../../apis/movie/interfaces/MovieInfoDto";
import { MovieStats } from "../../apis/movie/interfaces/MovieStats";
import { ApiResponse } from "../../apis/ApiResponse";
import { MovieStatDto } from "../../apis/movie/interfaces/MovieStatDto";
import Reviews from "../../components/review/Reviews";

Chart.register(...registerables);

export default function Movie() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code: string = searchParams.get('code') || '';

  const [movieInfo, setMovieInfo] = useState<MovieInfoDto | null>(null);
  const [movieStats, setMovieStats] = useState<MovieStats[]>([]);

  const statType: StatType = 'RANKING';

  const fetchMovie = useCallback((): Promise<ApiResponse<MovieInfoDto>> =>
    MovieApiServicePublic.getMovie(code), [code]);
  const fetchStats = useCallback((): Promise<ApiResponse<MovieStatDto>> =>
    MovieApiServicePublic.getMovieStats(code, statType, 30), [code, statType]);

  const fetchedMovieInfo = useApiFetch<MovieInfoDto>(fetchMovie);
  const fetchMovieStats = useApiFetch<MovieStatDto>(fetchStats);

  useEffect(() => {
    if (fetchedMovieInfo) {
      setMovieInfo(fetchedMovieInfo);
    }
  }, [movieInfo, fetchedMovieInfo]);

  useEffect(() => {
    if (fetchMovieStats) {
      setMovieStats(fetchMovieStats.statDtos)
    }
  }, [movieStats, fetchMovieStats]);

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

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">


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
              <StarRating code={Number(code)} initialRating={movieInfo?.rating ?? 0} />
            </div>
          </div>
        </div>

        {/* Reviews는 데이터 준비 완료 후 랜더링 */}
        {movieInfo && movieStats.length > 0 && (
          <div className="flex justify-center">
            <div className="w-full max-w-[450px]">
              <Reviews code={Number(code)} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
