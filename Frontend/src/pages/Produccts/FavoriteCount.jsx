import { useSelector } from "react-redux";

export const FavoriteCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoritesCount = favorites.length;

  return (
    <div className="absolute left-4 top-9">
      {favoritesCount > 0 && (
        <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
            {favoritesCount}
        </span>
      )}
    </div>
  );
};
