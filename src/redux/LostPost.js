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
        // Do not set Content-Type for FormData, let browser set it
      }),
      invalidatesTags: ["LostPosts"],
    }),

    getAllLostPosts: builder.query({
      query: () => "/getlost",
      providesTags: ["LostPosts"],
    }),

    getLostPostById: builder.query({
      query: (id) => `/getlost/${id}`,
      providesTags: (result, error, id) => [{ type: "LostPosts", id }],
    }),

    getLostPostsByUserId: builder.query({
      query: () => "/getlostbyuserid",
      providesTags: ["LostPosts"],
    }),

    updateLostPost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updatelost/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "LostPosts", id },
        "LostPosts"
      ],
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
  useGetLostPostByIdQuery,
  useGetLostPostsByUserIdQuery,
  useUpdateLostPostMutation,
  useDeleteLostPostMutation,
} = lostPostApi;