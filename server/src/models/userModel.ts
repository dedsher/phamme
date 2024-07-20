export interface User {
  id?: string;
  email: string;
  username?: string;
  firstname: string;
  lastname: string;
  password: string;
  created_at: string;
  updated_at: string;
  avatar_url?: string;
  status: "online" | "offline";
  last_login: string;
}

export type UserData = Pick<User, "email" | "firstname" | "lastname" | "password" | "avatar_url">;
