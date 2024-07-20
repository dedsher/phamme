import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "@shared/api/getBaseQuery";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: getBaseQuery(true),
  endpoints: (builder) => ({
    getUserChats: builder.query({
      query: (userId) => ({
        url: `/chats/user/${userId}`,
      }),
    }),
    getChatMessages: builder.query({
      query: (chatId) => ({
        url: `/messages/chat/${chatId}`,
      }),
    }),
    getChatAttachments: builder.query({
      query: (chatId) => ({
        url: `/attachments/chat/${chatId}`,
      }),
    }),
    sendMessage: builder.mutation({
      query: ({ chatId, formData }) => ({
        url: `/messages/chat/${chatId}`,
        method: "POST",
        body: formData,
      }),
    }),
    saveMessage: builder.mutation({
      query: (editData) => ({
        url: `/messages/${editData.id}`,
        method: "PUT",
        body: editData,
      }),
    }),
  }),
});

export const {
  useGetUserChatsQuery,
  useGetChatMessagesQuery,
  useGetChatAttachmentsQuery,
  useSendMessageMutation,
  useSaveMessageMutation,
} = chatApi;
