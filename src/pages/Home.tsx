import MovieCard from "../components/MovieCard";
import { useCallback, useEffect, useState } from "react";
import { MovieInfoDto } from "../apis/movie/interfaces/MovieInfoDto";
import InfiniteScroll, { infiniteScrollHabndler } from "../components/infinitescroll/InfiniteScroll";
import { useSearchParams } from "react-router-dom";
import { getDateRange, getMovies } from "../apis/movie/MovieApiServicePublic";
import { Page } from "../apis/movie/interfaces/Page";

type HomeProps = {
  Layout: React.FC<{ children: React.ReactNode }>;
}

export default function Home({ Layout }: HomeProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [date, setDate] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState<MovieInfoDto[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [movieLoading, setMovieLoading] = useState<boolean>(true);

  const [isInitialized, setIsInitialized] = useState(false);
  const size: number = 10;

  useEffect(() => {
    // 초기화를 위한 비동기 작업
    const initialize = async () => {
      const dateRange = await getDateRange();
      if (dateRange) {
        setStartDate(dateRange.data.startDate);
        setEndDate(dateRange.data.endDate);
        setDate(dateRange.data.endDate);
        setSearchParams({ targetDate: dateRange.data.endDate });
      }
    };

    if (isInitialized === false) {
      initialize();
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (!date) return; // date가 설정되기 전에 fetchMovies가 호출되지 않도록 방지

    const fetchMovies = async () => {
      setMovieLoading(true);
      const movies: Page<MovieInfoDto[]> = await getMovies(date, page - 1, size);
      // 이전 데이터를 유지하며 새 데이터를 추가
      setData((prevData) => [...prevData, ...movies.content]);
      setHasMore(!movies.last);
      setMovieLoading(false);
    };

    if (isInitialized) {
      fetchMovies();
    }
  }, [isInitialized, date, page, size]);

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    setSearchParams({ targetDate: newDate });
    setPage(1);
    setData([]);
    setHasMore(true);
  };

  // 무한 스크롤
  const setNextPage = useCallback<infiniteScrollHabndler>(() => {
    if (movieLoading || !hasMore) return;

    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [movieLoading]);

  if (!isInitialized) {
    // 초기화가 완료되지 않았을 경우 로딩 화면 표시
    return (
      <Layout>
        <div className="bg-orange-300 min-h-screen flex justify-center items-center">
          <div className="text-center">날짜 데이터를 불러오는 중입니다...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-orange-300 min-h-screen">
        <div className="flex flex-col items-center space-y-8 mt-8">
          <input
            type="date"
            value={date}
            min={startDate}
            max={endDate}
            onChange={(e) => handleDateChange(e.target.value)}
          />
          <InfiniteScroll
            onEnd={setNextPage}
            rootMargin="50px"
            isLoading={movieLoading}
          >
            {data && data.map((movieInfo) => (
              <MovieCard key={movieInfo.code} movie={movieInfo} />
            ))
            }
          </InfiniteScroll>
        </div>

        {movieLoading && <div className="text-center mt-4"> 로딩중 입니다... </div>}
      </div>
    </Layout>
  );
}
