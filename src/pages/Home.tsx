import Layout from "../components/Layout";
import MovieCard from "../components/MovieCard";
import { MovieApiServicePublic } from "../apis/movie/MovieApiServicePublic";
import { useApiFetch } from "../hooks/FetchApiFunc";
import { useCallback, useEffect, useState } from "react";
import { createEmptyPage, Page } from "../apis/movie/interfaces/Page";
import { MovieInfoDto } from "../apis/movie/interfaces/MovieInfoDto";
import InfiniteScroll, { infiniteScrollHabndler } from "../components/infinitescroll/InfiniteScroll";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const targetDate: string = searchParams.get("targetDate") || "2004-01-01";
  const [date, setDate] = useState(targetDate);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<MovieInfoDto[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [startDate, setStartDate] = useState<string>("2004-01-01");
  const [endDate, setEndDate] = useState<string>("2004-01-02");
  const size: number = 10;

  useEffect(() => {
    MovieApiServicePublic.getDateRange().then((response) => {
      if (response) {
        setStartDate(response.data.startDate);
        setEndDate(response.data.endDate);
        setDate(response.data.endDate);
        setSearchParams({ targetDate: response.data.endDate });
      }
    });
  }, []);

  useEffect(() => {
    if (!searchParams.has("targetDate")) {
      setSearchParams({ targetDate: targetDate });
    } else {
      setPage(1);
      setData([]);
      setHasMore(true);
    }
  }, [targetDate, setSearchParams]);

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    setSearchParams({ targetDate: newDate });
    setPage(1);
    setData([]);
    setHasMore(true);
  };

  const fetchMovies = useCallback(() => {
    return MovieApiServicePublic.getMovies(targetDate, page - 1, size);
  }, [targetDate, page]);

  const { data: pagedData, isLoading: movieLoading } = useApiFetch<Page<MovieInfoDto[]>>(fetchMovies) || createEmptyPage<MovieInfoDto[]>();

  useEffect(() => {
    if (!movieLoading) {
      if (pagedData && pagedData.content.length > 0) {
        setData((prevData) => [...prevData, ...pagedData.content]);
        if (pagedData.content.length < size) {
          setHasMore(false);
        }
      }
    }
  }, [pagedData])

  // 무한 스크롤
  const setNextPage = useCallback<infiniteScrollHabndler>(() => {
    if (movieLoading || !hasMore) return;

    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [movieLoading]);

  return (
    <Layout>
      <div className="bg-orange-300 min-h-screen">
        <div className="flex flex-col items-center space-y-8 mt-8">
          <input
            type="date"
            value={targetDate}
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
