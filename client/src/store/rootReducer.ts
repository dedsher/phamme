import { combineReducers } from "redux";
import userSlice from "./features/userSlice.ts";
import chatsSlice from "./features/chatsSlice.ts";
import messageSlice from "./features/messagesSlice.ts";
import transactionSlice from "./features/transactionsSlice.ts";
import friendSlice from "./features/friendSlice.ts";

export const rootReducer = combineReducers({
  users: userSlice,
  chats: chatsSlice,
  messages: messageSlice,
  transactions: transactionSlice,
  friend: friendSlice,
});
