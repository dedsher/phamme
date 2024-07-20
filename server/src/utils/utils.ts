import { jwtDecode } from "jwt-decode";

export const isMe = (token: string, id: string): boolean => {
  try {
    const payload: { id: string } = jwtDecode(token);
    return payload!.id === id;
  } catch (error) {
    return false;
  }
};
