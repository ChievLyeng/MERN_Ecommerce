import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorite/favoriteSlice";
import { Product } from "./Product";

export const Favorite = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="ml-[10rem] h-screen">
      <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
        FAVORITE PRODUCT
      </h1>
      <div className="flex flex-wrap">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <div className="flex justify-center">
        <iframe
          width="1000"
          height="500"
          src="https://www.youtube.com/embed/3xIdMzF98fE"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
