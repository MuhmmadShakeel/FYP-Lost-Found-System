import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const userApi = createApi({
  reducerPath: 'userApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1/user',
    credentials: 'include',
  }),

  tagTypes: ['User'],

  endpoints: (builder) => ({

// ✅ REGISTER
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    // ✅ LOGIN (FIXED POSITION)
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

// ✅ EXPORT HOOKS
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetAllUsersQuery,
  useDeleteuserMutation,
} = userApi;