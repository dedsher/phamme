import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "@shared/api/getBaseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: getBaseQuery(true),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
      }),
    }),
    getUsersForSearch: builder.query({
      query: (userId) => ({
        url: `/users/${userId}/search`,
      }),
    }),
    getUserProfile: builder.query({
      query: (userId) => ({
        url: `/users/${userId}/profile`,
      }),
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: "PUT",
        body: user,
      }),
    }),
    getUserStatus: builder.query({
      query: ({ userId, status }) => ({
        url: `/users/${userId}/status/${status}`,
      }),
    }),
  }),
});

export const { useGetUserQuery, useGetUserProfileQuery, useUpdateUserMutation, useGetUserStatusQuery, useLazyGetUsersForSearchQuery } =
  userApi;
