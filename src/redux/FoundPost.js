import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const foundPostApi = createApi({
    reducerPath: "foundPostApi",    
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/api/v4/foundposts`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        }
    }),
    tagTypes: ["FoundPosts"],
    endpoints: (builder) => ({
        createFoundPost: builder.mutation({
            query: (data) => ({
                url: "/createfound",
                method: "POST",
                body: data,
                // Do not set Content-Type for FormData, let browser set it
            }),
            invalidatesTags: ["FoundPosts"],
        }),
        getAllFoundPosts: builder.query({
            query: () => "/getallfound",
            providesTags: ["FoundPosts"],
        }),

        getFoundpoatsbyid: builder.query({
            query: () => `/getfoundbyid`,
            method: "GET",
            providesTags: ["FoundPosts"],
        }),

        updatefoundpost: builder.mutation({
            query: ({ id, data }) => ({
                url: `/updatefound/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["FoundPosts"],
        }),
         
        deleteFoundPost: builder.mutation({
            query: (id) => ({
                url: `/deletefound/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["FoundPosts"],
        }),
    }),
});

export const {useCreateFoundPostMutation, useGetAllFoundPostsQuery, useGetFoundpoatsbyidQuery, useUpdatefoundpostMutation, useDeleteFoundPostMutation} = foundPostApi;
