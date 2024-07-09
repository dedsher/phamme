import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import chatsSlice from "./features/chatsSlice";
import messagesSlice from "./features/messagesSlice";
import friendSlice from "./features/friendSlice";
import userSlice from "./features/userSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    chats: chatsSlice,
    messages: messagesSlice,
    friend: friendSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
