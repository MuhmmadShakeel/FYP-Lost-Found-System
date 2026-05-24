import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const claimApi = createApi({
  reducerPath: "claimApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v6/claim/",
    credentials: "include",
  }),

  tagTypes: ["Claim"],

  endpoints: (builder) => ({

    // ================= CREATE CLAIM ITEM =================
   createClaimItem: builder.mutation({
  query: ({ id, formData }) => ({
    url: `claimitem/${id}`,
    method: "POST",
    body: formData, // MUST be raw FormData
  }),


      invalidatesTags: ["Claim"],
    }),

  }),
});

export const {
  useCreateClaimItemMutation,
} = claimApi;
