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
    createReturnItem: builder.mutation({
      query: ({ id, formData }) => ({
        url: `returnitem/${id}`,
        method: "POST",
        body: formData,
      }),

      invalidatesTags: ["Return"],
    }),
  }),
});

export const { useCreateReturnItemMutation } = returnApi;
