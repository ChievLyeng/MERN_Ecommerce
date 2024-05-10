import { PRODUCT_URL, UPLOAD_URL } from "../features/constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/allProducts`,
        method: "GET",
      }),
    }),
    getProducts: builder.query({
      query: ({ keyword }) => ({
        url: `${PRODUCT_URL}/product`,
        method: "GET",
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "GET",
      }),
      providesTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
    }),
    getTopProduct: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/product/top`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getNewProduct: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/product/new`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "PUT",
        body: formData,
        credentials: "include",
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      providesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetNewProductQuery,
  useGetProductByIdQuery,
  useGetTopProductQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
} = productApiSlice;
