import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:3000/api';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUserChats: builder.query({
      query: (userId) => ({
        url: `/chats/user/${userId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    getChatMessages: builder.query({
      query: (chatId) => ({
        url: `/messages/chat/${chatId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    getChatAttachments: builder.query({
      query: (chatId) => ({
        url: `/attachments/chat/${chatId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    sendMessage: builder.mutation({
      query: ({ chatId, formData }) => ({
        url: `/messages/chat/${chatId}`,
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
  }),
});

export const {
  useGetUserChatsQuery,
  useGetChatMessagesQuery,
  useGetChatAttachmentsQuery,
  useSendMessageMutation,
} = chatApi;