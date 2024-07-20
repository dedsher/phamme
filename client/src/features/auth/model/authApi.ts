import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "@shared/api/getBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: getBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
        credentials: "include",
      }),
    }),
    register: builder.mutation({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    verify: builder.mutation({
      query: (token) => ({
        url: `/auth/verification/${token}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyMutation,
} = authApi;
