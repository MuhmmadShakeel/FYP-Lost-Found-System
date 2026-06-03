import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const returnApi = createApi({
  reducerPath: "returnApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v7/return/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Return"],

  endpoints: (builder) => ({
    // ================= CREATE RETURN ITEM =================
    createReturnItem: builder.mutation({
      query: ({ id, formData }) => ({
        url: `returnitem/${id}`,
        method: "POST",
        body: formData, // MUST be raw FormData
      }),
      invalidatesTags: ["Return"],
    }),
    // ================= GET RETURN INFO =================
    getReturnInfo: builder.query({
      query: () => ({
        url: `getreturninfo`,
        method: "GET",
      }),
      providesTags: ["Return"],
    }),
    // ================= GET ALL RETURNS =================
    getAllReturns: builder.query({
      query: () => ({
        url: `allgetreturns`,
        method: "GET",
      }),
      providesTags: ["Return"],
    }),
    // ================= DELETE RETURN ITEM =================
    deleteReturnItem: builder.mutation({
      query: (returnId) => ({
        url: `returnitem/${returnId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Return"],
    }),
  }),
});

export const {
  useCreateReturnItemMutation,
  useGetReturnInfoQuery,
  useGetAllReturnsQuery,
  useDeleteReturnItemMutation,
} = returnApi;