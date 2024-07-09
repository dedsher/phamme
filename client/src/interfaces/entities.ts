export interface IUser {
  id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  avatar_url: string;
  status: string;
  created_at: string;
  updated_at: string;
  last_login: string;
  login?: string;
}

export type RegisterData = Pick<
  IUser,
  "email" | "firstname" | "lastname" | "password"
>;
export type LoginData = Pick<IUser, "login" | "password">;

export interface IChat {
  id: string;
  name: string;
  participants: IUser[];
  messages: IMessage[];
}

export interface IChatPreview {
  id: number;
  last_message: string;
  last_message_at: string;
  last_message_author_id: number;
  unread_count: number;
  firstname: string;
  lastname: string;
  avatar_url: string;
  friend_id: number;
}

export interface IMessage {
  id: number;
  content: string;
  sender_id: number;
  created_at: string;
  status: string;
  reply_to?: number;
  attachments?: IAttachment[];
}

export interface IFriend {
  id: number;
  firstname: string;
  lastname: string;
  status: string;
}

export interface IAttachment {
  message_id: number;
  type: string;
  url: string;
  width?: number;
  height?: number;
}

export interface ITransaction {
  id: string;
  amount: number;
  date: string;
  userId: string;
}
