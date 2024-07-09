import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3000/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    getUserChats: builder.query({
      query: (userId) => ({
        url: `/chats/user/${userId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    getChatMessages: builder.query({
      query: (chatId) => ({
        url: `/messages/chat/${chatId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    sendMessage: builder.mutation({
      query: ({ chatId, formData }) => ({
        url: `/messages/chat/${chatId}`,
        method: "POST",
        body: formData,
        formData: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
    }),
    register: builder.mutation({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserChatsQuery,
  useGetChatMessagesQuery,
  useRegisterMutation,
  useLoginMutation,
  useSendMessageMutation,
} = apiSlice;
