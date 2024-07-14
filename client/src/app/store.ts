import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "../store/apiSlice";
import chatsSlice from "../store/features/chatsSlice";
import messagesSlice from "../store/features/messagesSlice";
import friendSlice from "../store/features/friendSlice";
import userSlice from "../store/features/userSlice";

import { chatApi } from "../entities/chat/api/chatApi";
import { userApi } from "@entities/user/model/userApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    chats: chatsSlice,
    messages: messagesSlice,
    friend: friendSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, chatApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
