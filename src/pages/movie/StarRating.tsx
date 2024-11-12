import styled from "@emotion/styled";
import { MovieApiServiceSecure } from "../../apis/movie/MovieApiServiceSecure";
import { useJwtTokens } from "../../hooks/useJwtTokens";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomModal from "../../components/CustomModal";
import StarInput from "./StarInput";

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

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    navigate('/login');
  };

  const handleSubmitRating = async (rating: number) => {
    const response = await MovieApiServiceSecure.submitMovieRating(code, rating, atk);
    if (response.isSuccess) {
      alert('평가가 완료되었습니다.');
      setRating(response.data)
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
        <RatingValue>{initialRating}</RatingValue>
      </Base>

      {/* 로그인 모달 */}
      {showLoginModal && (
        <CustomModal
          message={`로그인한 경우에만 평가를 할 수 있습니다. \n 로그인 하시겠습니까?`}
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
