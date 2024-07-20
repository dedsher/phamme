export interface IUser {
  id: number;
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
  wallet?: string;
}

export interface RegisterData {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  passwordRepeat: string;
};
export interface LoginData {
  login: string;
  password: string;
};

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
  status: "online" | "offline";
}

export interface IMessage {
  id: number;
  content: string;
  sender_id: number;
  created_at: string;
  status: string;
  reply_to?: number;
  attachments?: IAttachment[];
  sender_name: string;
  sender_avatar_url?: string;
}

export interface IFriend {
  id: number;
  firstname: string;
  lastname: string;
  status: string;
}

export interface IAttachment {
  id: number;
  message_id: number;
  type: string;
  url: string;
  name: string;
}

export interface ITransaction {
  id: string;
  amount: number;
  date: string;
  userId: string;
}
