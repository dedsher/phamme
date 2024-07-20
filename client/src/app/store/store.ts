import { configureStore } from "@reduxjs/toolkit";
import friendSlice from "@features/chat/model/friendSlice";
import userSlice from "@entities/user/model/userSlice";
import authSlice from "@features/auth/model/authSlice";

import { chatApi } from "@features/chat/model/chatApi";
import { userApi } from "@entities/user/model/userApi";
import { authApi } from "@features/auth/model/authApi";
import { settingsApi } from "@features/settings/model/settingsApi";
import { transactionApi } from "@features/transaction/model/transactionApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    friend: friendSlice,
    user: userSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      chatApi.middleware,
      authApi.middleware,
      settingsApi.middleware,
      transactionApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
