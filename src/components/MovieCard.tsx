import { Link } from "react-router-dom";
import StarRatingSum from "./StarRatingSum";
import { MovieInfoDto } from "../apis/movie/interfaces/MovieInfoDto";
import UserMovieApiServiceSecure from "../apis/user/UserMovieApiServiceSecure";
import { UpdateLikeRes } from "../apis/movie/interfaces/UpdateLikeRes";
import { useState } from "react";
import { safeApiCall } from "../apis/SafeApiCall";
import { ApiResponse } from "../apis/ApiResponse";

interface MovieCardProps {
  movie: MovieInfoDto;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { poster, movieDirectorDtos, movieLeadactorDtos } = movie;
  const rating = movie.rating;
  const defaultPoster = "/empty_image.jpg";

  const [liked, setLiked] = useState(movie.isLike);

  const toggleLike = async () => {
    const data: ApiResponse<UpdateLikeRes> = await safeApiCall<UpdateLikeRes>(() =>
      UserMovieApiServiceSecure.updateLike(movie.code, !liked));

    if (data) {
      setLiked(!liked);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-md relative">
      {/*제목*/}
      <div className="flex mb-2 w-full">
        <h3 className="text-gray-500 font-bold text-lg flex flex-grow">
          {movie.ranking}. {movie.title}
        </h3>
      </div>
      {/* 별점과 평점 */}
      <div className="text-gray-500 font-bold text-base flex items-center mb-2 w-full">
        <span className="mr-2 text-gray-600">평점: {rating}</span>
        <StarRatingSum rating={rating} />
        {/* 좋아요 버튼 */}
        <button
          onClick={toggleLike}
          className={`ml-auto flex items-center px-3 py-1 rounded-full text-sm font-bold 
            ${liked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"} hover:shadow-md`}
        >
          {liked ? "❤️ 좋아요" : "🤍 좋아요"}
        </button>
      </div>

      {/* <div className="bg-orange-500 flex flex-row"> */}
      <div className="bg-red-500 flex">
        {/* 이미지 */}
        <Link
          to={`/movie?code=${movie.code}`}
        >
          <img
            src={poster && poster.length > 0 ? poster[0] : defaultPoster}
            alt={movie.title}
            className="rounded-md"
          />
        </Link>
      </div>

      {/* 텍스트 정보 */}
      {/* 추가 정보 */}
      <div className="bg-lime-300 text-sm text-gray-700 text-left p-2 flex-grow w-full">
        <p><strong>영화 정보:</strong> {movie.details}</p>
        <p><strong>개봉일:</strong> {movie.releaseDate}</p>
        <p><strong>제작연도:</strong> {movie.productionYear}</p>
        <p>
          <strong>감독: </strong>
          {movieDirectorDtos?.map((d, index) => (
            <span key={index}>
              {d.name}
              {index < movieDirectorDtos.length - 1 && " | "}
            </span>
          ))}
        </p>
        <p><strong>주연: </strong>
          {movieLeadactorDtos?.map((a, index) => (
            <span key={index}>
              {a.name}
              {index < movieLeadactorDtos.length - 1 && " | "}
            </span>
          ))}
        </p>
      </div>
    </div >
  );
};

export default MovieCard;
