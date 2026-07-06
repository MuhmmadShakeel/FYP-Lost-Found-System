import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const userApi = createApi({
  reducerPath: 'userApi',

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/user`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['User'],

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),

  getAllUsers: builder.query({
  query: () => ({
    url: '/getalluser',
  }),
}),

    deleteuser:builder.mutation({
      query: (id) => ({
        url: `/deleteuser/${id}`,
        method: 'DELETE',
      }),
    }),

  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetAllUsersQuery,
  useDeleteuserMutation,
} = userApi;