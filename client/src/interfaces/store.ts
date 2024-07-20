import {
  IChatPreview,
  IMessage,
  ITransaction,
  IUser,
} from "./entities";

export interface UserState {
  user: IUser;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface ChatsState {
  chats: IChatPreview[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface MessagesState {
  messages: IMessage[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface FriendState {
  currentFriendId: number | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface TransactionsState {
  transactions: ITransaction[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
