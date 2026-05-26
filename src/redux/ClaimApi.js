import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const claimApi = createApi({
  reducerPath: "claimApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v6/claim/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
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
    // ================= GET CLAIM INFO =================
    getClaimInfo: builder.query({
      query: () => ({
        url: `getclaiminfo`,
        method: "GET",
      }),
      providesTags: ["Claim"],
    }),
    // ================= GET ALL CLAIMS =================
    getAllClaims: builder.query({
      query: () => ({
        url: `allgetclaims`,
        method: "GET",
      }),
      providesTags: ["Claim"],
    }),
    // ================= DELETE CLAIM ITEM =================
    deleteClaimItem: builder.mutation({
      query: (claimId) => ({
        url: `claimitem/${claimId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Claim"],
    }),
  }),
});

export const {
  useCreateClaimItemMutation,
  useGetClaimInfoQuery,
  useGetAllClaimsQuery,
  useDeleteClaimItemMutation,
} = claimApi;