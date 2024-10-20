import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // 별 아이콘 사용

interface StarRatingProps {
  rating: number;  // 평점 (0-10)
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  // 별의 개수를 계산하는 로직
  const fullStars = Math.floor(rating / 2);  // 꽉 찬 별 개수
  const hasHalfStar = rating % 2 >= 0.5;     // 반 별 유무

  return (
    <div className="flex items-center">
      {/* 꽉 찬 별 렌더링 */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <FaStar key={index} className="text-yellow-500" />
      ))}
      
      {/* 반 별 렌더링 */}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
      
      {/* 나머지 빈 별 렌더링 */}
      {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }).map((_, index) => (
        <FaRegStar key={index} className="text-yellow-500" />
      ))}
    </div>
  );
};

export default StarRating;