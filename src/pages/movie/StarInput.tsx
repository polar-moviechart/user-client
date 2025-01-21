import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useEffect, useState } from "react";

interface LabelProps {
  isHalf?: boolean;
}

// shouldForwardProp을 적용하여 커스텀 속성이 전달되지 않도록 설정
const Label = styled('label', {
  shouldForwardProp: (prop) => prop !== 'isHalf'
})<LabelProps>`
  cursor: pointer;
  font-size: 1.5rem;
  color: lightgray;


  ${({ isHalf }) =>
    isHalf &&
    css`
      position: absolute;
      width: 12px;
      overflow: hidden;

      &:nth-of-type(10) {
        transform: translate(-108px);
      }
      &:nth-of-type(8) {
        transform: translate(-84px);
      }
      &:nth-of-type(6) {
        transform: translate(-60px);
      }
      &:nth-of-type(4) {
        transform: translate(-36px);
      }
      &:nth-of-type(2) {
        transform: translate(-12px);
      }
    `}
`;

const Input = styled.input`
  display: none;
`;

// const StarInput = ({ onClickRating, value, isHalf, ratingValue}) => {
//   const handleClickRatingInput = () => {
//     onClickRating(ratingValue);
// };

const StarInput: React.FC<{
  value: number;
  isHalf: boolean;
  ratingValue: number;
  onClickRating: (rating: number) => void;
}> = ({ value, isHalf, ratingValue, onClickRating }) => {
  const isChecked = value === ratingValue;

  const handleClickRatingInput = () => {
    onClickRating(value);
  };

  return (
    <>
      <Input
        type="radio"
        name="rating"
        id={`star${value}`}
        value={value}
        checked={isChecked} // 현재 별점과 value 비교
        readOnly // 사용자가 직접 수정하지 못하도록
      />
      <Label
        onClick={handleClickRatingInput}
        isHalf={isHalf}
        htmlFor={`star${value}`}
      >
        {isHalf ? <FaStarHalf /> : <FaStar />}
      </Label>
    </>
  );
};

export default StarInput;