import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";  // 쿼리 파라미터를 가져오기 위한 훅
import StarRating from "./StarRating";
import MovieCard from "../../components/MovieCard";
import transformStats from "./transformStats";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { DataPoint } from "../../components/chart/DataPoint";
import { Dataset } from "../../components/chart/Dataset";
import { StatType } from "../../apis/movie/type/StatType";
import { MovieInfoDto } from "../../apis/movie/interfaces/MovieInfoDto";
import { MovieStats } from "../../apis/movie/interfaces/MovieStats";
import { MovieStatDto } from "../../apis/movie/interfaces/MovieStatDto";
import Reviews from "../../components/review/Reviews";
import { getMovie, getMovieStats } from "../../apis/movie/MovieApiServicePublic";

Chart.register(...registerables);

type MovieProps = {
  Layout: React.FC<{ children: React.ReactNode }>;
}

export default function Movie({ Layout }: MovieProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code: string = searchParams.get('code') || '';

  const [movieInfo, setMovieInfo] = useState<MovieInfoDto | null>(null);
  const [movieLading, setMovieLoading] = useState<boolean>(true);

  const [movieStats, setMovieStats] = useState<MovieStats[]>([]);
  const [statLoading, setStatLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<{ labels: Date[], datasets: Dataset[] }>


    ({
      labels: [],
      datasets: [],
    });

  const statType: StatType = 'RANKING';

  const fetchMovie = async () => {
    setMovieLoading(true);
    const response: MovieInfoDto = await getMovie(code);
    setMovieInfo(response);
    setMovieLoading(false);
  };

  useEffect(() => {
    fetchMovie();
  }, [code]);

  useEffect(() => {
    const fetchStats = async () => {
      setStatLoading(true);
      const response: MovieStatDto = await getMovieStats(code, statType, 30);
      setMovieStats(response.statDtos);
      setStatLoading(false);
    }

    if (statLoading === true) {
      fetchStats();
    }

    if (statLoading === false) {
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
      setChartData(dataset);
    }
  }, [code, statLoading]);

  const handleRatingComplete = () => {
    fetchMovie();
  }

  const cardWidth = "450px";
  const chartHeight = "250px";

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        <div className="bg-white flex justify-center">
          {/* 영화 카드 섹션 */}
          <div className="flex flex-col items-center">
            {movieInfo && <MovieCard key={movieInfo?.code} movie={movieInfo} />}

            {/* 라인차트 표시 */}
            <div className="w-full bg-white" style={{ width: cardWidth, height: chartHeight }}>
              <Line data={chartData} />
            </div>

            <div className="flex flex-col items-center mt-4 mb-4">
              <p className="text-black">평점을 입력해주세요.</p>
              <StarRating
                code={Number(code)}
                initialRating={movieInfo?.rating ?? 0}
                onRatingComplete={handleRatingComplete}
                />
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
