import Layout from "../components/Layout";
import MovieCard from "../components/MovieCard";
import { MovieApiServicePublic } from "../apis/movie/MovieApiServicePublic";
import { useApiFetch } from "../hooks/FetchApiFunc";
import { useCallback, useEffect, useState } from "react";
import { createEmptyPage, Page } from "../apis/movie/interfaces/Page";
import { MovieInfoDto } from "../apis/movie/interfaces/MovieInfoDto";
import InfiniteScroll, { infiniteScrollHabndler } from "../components/infinitescroll/InfiniteScroll";

export default function Home() {
  const targetDate: string = '2004-01-01';
  const [page, setPage] = useState(1);
  const [data, setData] = useState<MovieInfoDto[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const size: number = 10;

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

  const handleScroll = () => {
    const bottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight;
    if (bottom && !movieLoading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
    console.log(bottom);
  };

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
