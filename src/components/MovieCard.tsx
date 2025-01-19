import { Link } from "react-router-dom";
import StarRatingSum from "./StarRatingSum";
import { MovieInfoDto } from "../apis/movie/interfaces/MovieInfoDto";
import UserMovieApiServiceSecure from "../apis/user/UserMovieApiServiceSecure";
import { UpdateLikeRes } from "../apis/movie/interfaces/UpdateLikeRes";
import { safeApiCall } from "../apis/SafeApiCall";
import { ApiResponse } from "../apis/ApiResponse";
import CustomModal from "./CustomModal";
import useModal from "../hooks/UseModal";
import { getRtk } from "../utils/authUtils";
import { useState } from "react";

interface MovieCardProps {
  movie: MovieInfoDto;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const {movieDirectorDtos, movieLeadactorDtos } = movie;
  const rating = movie.rating;
  const [liked, setLiked] = useState(movie.isLike);
  const defaultPoster = "/empty_image.jpg";


  const { modalState, openModal, closeModal } = useModal();

  // s3에서 이미지 불러오기
  // useEffect(() => {
  //   const fetchImageUrl = async () => {
  //     if (thumbnail) {
  //       const url = await getPresignedUrl(movie.thumbnail);
  //       setImageUrl(url);
  //     }
  // };
  // fetchImageUrl();
  // }, [thumbnail]);

  const handleLikeClick = () => {
    const rtk = getRtk();
    if (!rtk) {
      openModal(
        '로그인 필요',
        '로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?'
      );
    } else {
      toggleLike();
    }
  }

  const toggleLike = async () => {
    const data: ApiResponse<UpdateLikeRes> = await safeApiCall<UpdateLikeRes>(() =>
      UserMovieApiServiceSecure.updateLike(movie.code, !liked));

    if (data) {
      setLiked(!liked);
    }
  };

  const handleLoginRedirect = () => {
    closeModal();
    window.location.href = '/login';
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-md mb-3">
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
          onClick={handleLikeClick}
          className={`ml-auto flex items-center px-3 py-1 rounded-full text-sm font-bold 
            ${liked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"} hover:shadow-md`}
        >
          {liked ? "❤️ 좋아요" : "🤍 좋아요"}
        </button>
        {/* 로그인 모달 */}
        <CustomModal
          title={modalState.title}
          message={modalState.message}
          onConfirm={handleLoginRedirect}
          onCancel={closeModal}
          isOpen={modalState.isOpen}
        />
      </div>

        {/* 이미지 */}
        <Link to={`/movie?code=${movie.code}`}>
          <img
            src={movie.thumbnail ? movie.thumbnail : defaultPoster}
            alt={movie.title}
            className="rounded-md w-full object-cover"
          />
        </Link>

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
