import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export const Rating = ({ value, text, color }) => {
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars > 0.5 ? 1 : 0;
  const emptystars = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} className={`text-${color} ml-1`} />
      ))}

      {halfStars === 1 && <FaStarHalfAlt className={`text-${color} ml-1`} />}

      {[...Array(emptystars)].map((_, index) => (
        <FaRegStar key={index} className={`text-${color} ml-1`} />
      ))}
    </div>
  );
};
Rating.defaultProps = {
  color: "yellow-500",
};
