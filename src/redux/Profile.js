import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProfileApi = createApi({
  reducerPath: "ProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v5/profile",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    createProfile: builder.mutation({
      query: (data) => ({
        url: "/createProfile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    getProfilebyId: builder.query({
      query: () => ({
        url: "/getProfilebyId",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/updateProfile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    deleteProfile: builder.mutation({
      query: () => ({
        url: "/deleteProfile",
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useCreateProfileMutation,
  useGetProfilebyIdQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = ProfileApi;
