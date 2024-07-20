import { NextFunction } from "express";
import { Chat } from "models/chatModel";
import { Message } from "models/messageModel";
import { User, UserData } from "models/userModel";

export interface IUserRepository {
  getAll(): Promise<User[] | null>;
  getUsersForSearch(userId: number): Promise<User[] | null>;
  getById(id: string): Promise<User | null>;
  getUserProfileById(id: number): Promise<User | null>;
  getPublicById(id: number): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  getByUsername(username: string): Promise<User | null>;
  create(user: UserData): Promise<User | null>;
  getContacts(id: number): Promise<User[] | null>;
  setStatus(id: number, status: string): Promise<User | null>;
  isVerified(id: number): Promise<boolean>;
  verifyUser(id: number): Promise<User | null>;
  getByRefreshToken(token: string): Promise<User | null>;
  deleteRefreshToken(refreshToken: string): Promise<User | null>;
  saveRefreshToken(id: number, token: string): Promise<User | null>;
  update(id: string, user: UserData): Promise<User | null>;
  delete(id: string): Promise<User | null>;
}

export interface IChatRepository {
  getById(id: number): Promise<Chat | null>;
  getByUserId(userId: number): Promise<Chat[]>;
  create(chat: Chat): Promise<Chat>;
  updateLastMessage(chat: Chat): Promise<Chat>;
  delete(id: string): Promise<number>;
}

export interface IMessageRepository {
  getByChatId(chatId: number): Promise<Message[]>;
  createMessage(messageObj: any): Promise<Message>;
  updateMessage(messageId: number, content: string): Promise<Message>;
  isMessageLast(messageId: number): Promise<boolean>;
  addAttachments(messageId: number, attachments: string[]): Promise<void>;
  markMessageAsRead(messageId: number): Promise<Message>;
  getChatIdByMessageId(messageId: number): Promise<number>;
}

export interface IAttachmentRepository {
  saveAttachments(
    messageId: number,
    attachmentRecords?: any[]
  ): Promise<any[] | null>;
  getByChatId(chatId: number): Promise<any[]>;
}

export interface ITransactionRepository {
  getAllByUserId(userId: number): Promise<any[]>;
  getFriends(userId: number): Promise<any[]>;
  addWallet(userId: number, wallet: string): Promise<string | null>;
  deleteWallet(userId: number): Promise<string | null>;
  create(transaction: any): Promise<any>;
}

export interface IUserService {
  getAll(): Promise<User[]>;
  getUsersForSearch(userId: number): Promise<User[]>;
  getById(id: string): Promise<User>;
  getUserProfileById(id: number): Promise<User>;
  getPublicById(id: number): Promise<User>;
  register(user: User): Promise<User | null>;
  setStatus(id: number, status: string): Promise<User | null>;
  login(
    login: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }>;
  getContacts(id: number): Promise<number[]>;
  refresh(refreshToken: string): Promise<string>;
  logout(refreshToken: string): Promise<User | null>;
  verifyUser(token: string): Promise<User | null>;
  update(id: string, user: User): Promise<User>;
  delete(id: string): Promise<User>;
}

export interface IChatService {
  getByUserId(userId: number): Promise<Chat[]>;
  create(chat: Chat): Promise<Chat>;
  updateLastMessage(chat: any): Promise<Chat>;
  delete(id: string): Promise<number | null>;
}

export interface IMessageService {
  getByChatId(chatId: number): Promise<any[]>;
  createMessage(
    messageObj: any,
    attachments?: any[]
  ): Promise<{ message: any; attachments: any[] | null }>;
  updateMessage(messageId: number, content: string): Promise<any>;
  markMessageAsRead(messageId: number): Promise<any>;
  getChatIdByMessageId(messageId: number): Promise<number>;
}

export interface IAttachmentService {
  getByChatId(chatId: number): Promise<any[]>;
}

export interface ITransactionService {
  getAllByUserId(userId: number): Promise<any[]>;
  getFriends(userId: number): Promise<any[]>;
  addWallet(userId: number, wallet: string): Promise<string | null>;
  deleteWallet(userId: number): Promise<string | null>;
  create(transaction: any): Promise<any>;
}
