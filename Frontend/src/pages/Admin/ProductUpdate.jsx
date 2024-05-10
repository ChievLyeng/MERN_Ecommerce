import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router";
import {
  useUpdateProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
  useDeleteProductMutation,
} from "../../redux/api/productApiSlice";
import { useGetCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

export const ProductUpdate = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params.id);

  const [image, setImage] = useState(productData?.data.image || "");
  const [name, setName] = useState(productData?.data.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.data.price || "");
  const [category, setCategory] = useState(productData?.data.category || "");
  const [quantity, setQuantity] = useState(productData?.data.quantity || "");
  const [brand, setBrand] = useState(productData?.data.brand || "");
  const [stock, setStock] = useState(productData?.data.countInStock);

  // hook
  const navigate = useNavigate();

  // Fetch categories using RTK Query
  const { data: categories = [] } = useGetCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();

  // Define the update product mutation
  const [updateProduct] = useUpdateProductMutation();

  // Define the delete product mutation
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData?.data && productData?.data._id) {
      setName(productData?.data.name);
      setDescription(productData?.data.description);
      setPrice(productData?.data.price);
      setCategory(productData?.data.category);
      setQuantity(productData?.data.quantity);
      setBrand(productData?.data.brand);
      setImage(productData?.data.image);
      setStock(productData?.data.countInStock);
    }
  }, [productData]);
  console.log("image", image);

  const handleFileUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added successfully");
      setImage(res.image);
    } catch (error) {
      toast.error("Image upload failed!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const res = await updateProduct({
        productId: params.id,
        formData,
      }).unwrap();
      if (res?.error) {
        toast.error(res?.error);
      } else {
        toast.success("Product successfully updated!");
      }
      navigate("/admin/allproducts");
    } catch (error) {
      toast.error("Update failed!,Pleas try again.");
    }
  };
  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );

      if (!answer) return;

      const { data } = await deleteProduct(params.id);
      console.log(data?.data);
      if (data.error) {
        toast.error("Delete Product Failed! Please try again.");
      } else {
        toast.success(`${data?.data.name} has been deleted.`);
      }
      navigate("/admin/allproducts");
    } catch (error) {
      toast.error("");
    }
  };
  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex  flex-col md:flex-row">
        {/* AdminMenu */}
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>
          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}
          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileUpload}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two lg:ml-10 ">
                <label htmlFor="name block">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Quantity</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="two lg:ml-10 ">
                <label htmlFor="name block">Brand</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              <div>
                <label htmlFor="name block">Count In Stock</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="md:ml-10">
                <label>Category</label> <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.data?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="" className="my-5">
                Description
              </label>
              <br />
              <textarea
                type="text"
                className="p-2 mb-3 bg-[#101011] border rounded-lg  w-[25rem] md:w-[95%] text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 mr-6"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
