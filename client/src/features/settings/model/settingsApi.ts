import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "@shared/api/getBaseQuery";

export const settingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery: getBaseQuery(true),
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}/logout`,
        method: "PUT",
        credentials: "include",
      }),
    }),
  }),
});

export const { useLogoutMutation } = settingsApi;
