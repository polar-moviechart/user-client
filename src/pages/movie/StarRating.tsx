import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomModal from "../../components/CustomModal";
import StarInput from "./StarInput";
import UserMovieApiServiceSecure from "../../apis/user/UserMovieApiServiceSecure";
import { getRtk, useJwtTokens } from "../../utils/authUtils";
import { ApiResponse } from "../../apis/ApiResponse";
import { RateResponse } from "../../apis/movie/interfaces/RateResponse";
import useModal from "../../hooks/UseModal";

const Base = styled.section`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Name = styled.span`
  font-size: 1.4rem;
  line-height: 100%;
`;

const RatingValue = styled.span`
  font-size: 1.2rem;
  line-height: 100%;
`;

const RatingField = styled.fieldset`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  border: none;
  transform: translateY(2px);

  input:checked ~ label,
  labeL:hover,
  labeL:hover ~ label {
    transition: 0.2s;
    color: orange;
  }
`;

interface StarRatingProps {
  code: number,
  initialRating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ code, initialRating }) => {
  const { atk } = useJwtTokens();
  const [rating, setRating] = useState<number>(initialRating);
  const [tempRating, setTempRating] = useState<number>(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const navigate = useNavigate();
  const { modalState, openModal, closeModal } = useModal();

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    navigate('/login');
  };

  const handleSubmitRating = async (rating: number) => {
    const response: ApiResponse<RateResponse> = await UserMovieApiServiceSecure.rateMovie(code, rating);
    if (response.isSuccess) {
      alert('평가가 완료되었습니다.');
      setRating(response.data.rating);
    } else {
      alert(response.errorMsg);
    }
    setShowRatingModal(false);
  };

  const handleClickRating = (rating: number) => {
    setTempRating(rating)
    if (!atk) {
      setShowLoginModal(true);
    } else {
      setShowRatingModal(true);
    }
  };

  const handleCancelModal = () => {
    setShowLoginModal(false);
    setShowRatingModal(false);
    setTempRating(0); // 취소 시 tempRating을 0으로 설정하여 0점 표시
    setRating(initialRating); // 취소 시 rating을 0으로 설정하여 화면에 0점 반영
  };

  const starValues = [
    { value: 10, isHalf: false },
    { value: 9, isHalf: true },
    { value: 8, isHalf: false },
    { value: 7, isHalf: true },
    { value: 6, isHalf: false },
    { value: 5, isHalf: true },
    { value: 4, isHalf: false },
    { value: 3, isHalf: true },
    { value: 2, isHalf: false },
    { value: 1, isHalf: true }
  ];

  return (
    <div>
      <Base>
        <Name>별점</Name>
        <RatingField>
          {starValues.map(({ value, isHalf }) => (
            <StarInput
              key={value}  // value를 key로 사용
              onClickRating={() => {
                handleClickRating(value)
              }}
              value={value}
              isHalf={isHalf}
            />
          ))}
        </RatingField>
        <RatingValue>{rating}</RatingValue>
      </Base>

      {/* 로그인 모달 */}
      {showLoginModal && (
        <CustomModal
          title="로그인 필요"
          message={`로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?`}
          onConfirm={handleLoginRedirect}
          onCancel={handleCancelModal}
          isOpen={showLoginModal} />
      )}

      {/* 별점 제출 확인 모달 */}
      {showRatingModal && (
        <CustomModal
          title="별점 제출 확인"
          message={`"${tempRating}" 별점을 평가하시겠습니까?`}
          onConfirm={() => handleSubmitRating(tempRating)}
          onCancel={handleCancelModal}
          isOpen={showRatingModal} />
      )}
    </div>
  );
};

export default StarRating;
