import axios from "axios";
import { LoginData, RegisterData } from "@interfaces/entities";

const BASE_URL = "http://localhost:3000/api";
const URLS = {
  users: `${BASE_URL}/users`,
  user: (userId: number) => `${BASE_URL}/users/${userId}`,
  chats: (userId: number) => `${BASE_URL}/chats/user/${userId}`,
  messages: (chatId: number) => `${BASE_URL}/messages/chat/${chatId}`,
  login: `${BASE_URL}/auth/login`,
  register: `${BASE_URL}/auth/register`,
};

export const registerUser = async (user: RegisterData) => {
  try {
    const response = await axios.post(URLS.register, user);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const loginUser = async (user: LoginData) => {
  try {
    const response = await axios.post(URLS.login, user);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getUser = async (userId: number) => {
  try {
    const response = await axios.get(URLS.user(userId), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getUserChats = async (userId: number) => {
  try {
    const response = await axios.get(URLS.chats(userId), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getChatMessages = async (chatId: number) => {
  try {
    const response = await axios.get(URLS.messages(chatId), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const sendMessage = async (chatId: number, formData: any) => {
  try {
    const response = await axios.post(URLS.messages(chatId), formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
