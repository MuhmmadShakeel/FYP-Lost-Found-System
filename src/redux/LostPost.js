import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const lostPostApi = createApi({
  reducerPath: "lostPostApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v3/lostposts",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  tagTypes: ["LostPosts"],

  endpoints: (builder) => ({
    createLostPost: builder.mutation({
      query: (data) => ({
        url: "/createlost",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["LostPosts"],
    }),

    getAllLostPosts: builder.query({
      query: () => "/getlost",
      providesTags: ["LostPosts"],
    }),

    deleteLostPost: builder.mutation({
      query: (id) => ({
        url: `/deletelost/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LostPosts"],
    }),
  }),
});

export const {
  useCreateLostPostMutation,
  useGetAllLostPostsQuery,
  useDeleteLostPostMutation,
} = lostPostApi;