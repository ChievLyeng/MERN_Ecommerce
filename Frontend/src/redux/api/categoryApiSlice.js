import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../features/constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ data, categoryId }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: `${CATEGORY_URL}/categories`,
        method: "GET",
      }),
    }),
    getCategoryById: builder.query({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryByIdQuery,
  useGetCategoriesQuery,
  user,
} = categoryApiSlice;
