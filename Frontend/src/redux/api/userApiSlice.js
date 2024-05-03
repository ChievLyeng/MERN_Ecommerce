import { apiSlice } from "./apiSlice";
import { USER_URL } from "../features/constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/auth`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USER_URL,
        credentials: "include",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USER_URL}/${userId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.userId}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useProfileMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useGetUserDetailsQuery,
} = userApiSlice;
