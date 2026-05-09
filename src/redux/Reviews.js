import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v2/reviews",
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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