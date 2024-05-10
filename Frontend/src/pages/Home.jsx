import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import { Loader } from "../components/Loader";
import Message from "../components/Message";
import { Header } from "../components/Header";


export const Home = () => {
  const { keyword } = useParams();
  console.log("key", keyword);
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      <div>
        <img alt="" />
        <Header />
        {/* {!keyword ? <Header /> : null} */}
      </div>
    </>
  );
};
