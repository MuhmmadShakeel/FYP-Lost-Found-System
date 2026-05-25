import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v2/reviews",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  // ✅ Correct placement
  tagTypes: ["Reviews"],

  endpoints: (builder) => ({
    // 🔥 CREATE REVIEW
    createReviews: builder.mutation({
      query: (data) => ({
        url: "/createreviews",
        method: "POST",
        body: data,
        // Removed headers because they are set by prepareHeaders
      }),

      // ✅ correct spelling
      invalidatesTags: ["Reviews"],
    }),

    // 🔥 GET ALL REVIEWS
    getAllReviews: builder.query({
      query: () => ({
        url: "/getreviews",
        method: "GET",
      }),

      providesTags: ["Reviews"],
    }),

    // 🔥 DELETE REVIEW
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/deletereview/${id}`,
        method: "DELETE",
        // Removed headers because they are set by prepareHeaders
      }),

      invalidatesTags: ["Reviews"],
    }),
  }),
});

// ✅ HOOK EXPORTS
export const {
  useCreateReviewsMutation,
  useGetAllReviewsQuery,
  useDeleteReviewMutation,
} = reviewsApi;