import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import MovieCard from "../components/MovieCard";
import { MovieInfoDto } from "../interfaces/MovieInfoDto";
import axios from "axios";
import Cookies from "js-cookie";

export default function Home() {
  const [movieInfos, setmovieInfos] = useState<MovieInfoDto[]>([]);

  const targetDate: string = '2004-01-01';
  const atk = Cookies.get('polar-atk');
  console.log("atk = " + atk);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_EDGE_SERVICE_URL}/api/v1/movies`,
        {
          params: {
            targetDate: targetDate,
            page: 0,
            size: 10,
          },
          headers: {
            Authorization: atk ? `Bearer ${atk}` : undefined,
          }
        }
      );

      setmovieInfos(response.data.data);
    };

    fetchMovies();
  }, [targetDate]);

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
