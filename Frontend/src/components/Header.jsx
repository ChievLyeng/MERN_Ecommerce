import { useGetTopProductQuery } from "../redux/api/productApiSlice";
import { Loader } from "./Loader";
import { SmallProduct } from "../pages/Produccts/SmallProduct";
import  ProductCarousel  from "../pages/Produccts/ProductCarousel";

export const Header = () => {
  const { data, isLoading, error } = useGetTopProductQuery();
  console.log(data);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <div className="flex justify-around ml-10">
      <div className="xl:block lg:hidden md:hidden sm:hidden">
        <div className="grid grid-cols-2 ">
          {data?.data.map((product) => (
            <div key={product._id}>
              <SmallProduct product={product} />
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <ProductCarousel />
      </div>
    </div>
  );
};
