import { NextFunction } from "express";
import { Chat } from "models/chatModel";
import { Message } from "models/messageModel";
import { User, UserData } from "models/userModel";

export interface IUserRepository {
  getAll(): Promise<User[] | null>;
  getById(id: string): Promise<User | null>;
  getPublicById(id: number): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  getByUsername(username: string): Promise<User | null>;
  create(user: UserData): Promise<User | null>;
  setStatus(id: number, status: string): Promise<User | null>;
  isVerified(id: number): Promise<boolean>;
  verifyUser(id: number): Promise<User | null>;
  saveRefreshToken(id: number, token: string): Promise<User | null>;
  update(id: string, user: UserData): Promise<User | null>;
  delete(id: string): Promise<User | null>;
}

export interface IChatRepository {
  getAll(): Promise<Chat[] | null>;
  getAllByIds(ids: number[]): Promise<Chat[] | null>;
  getById(id: string): Promise<Chat | null>;
  getByUserId(userId: number): Promise<Chat[]>;
  create(chat: Chat): Promise<Chat>;
  updateLastMessage(chat: Chat): Promise<Chat>;
  delete(id: string): Promise<number>;
}

export interface IMessageRepository {
  getByChatId(chatId: number): Promise<Message[]>;
  createMessage(messageObj: any): Promise<Message>;
  addAttachments(messageId: number, attachments: string[]): Promise<void>;
}

export interface IAttachmentRepository {
  saveAttachments(messageId: number, attachmentRecords?: any[]): Promise<any[] | null>;
  getByChatId(chatId: number): Promise<any[]>;
}

export interface IUserService {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User>;
  getPublicById(id: number): Promise<User>;
  register(user: User): Promise<User | null>;
  setStatus(id: number, status: string): Promise<User | null>;
  login(login: string, password: string): Promise<{ accessToken: string, refreshToken: string }>;
  verifyUser(token: string): Promise<User | null>;
  update(id: string, user: User): Promise<User>;
  delete(id: string): Promise<User>;
}

export interface IChatService {
  getAll(): Promise<Chat[] | null>;
  getById(id: string): Promise<Chat | null>;
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
}

export interface IAttachmentService {
  getByChatId(chatId: number): Promise<any[]>;
}

export interface IUserController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  getById(req: Request, res: Response, next: NextFunction): Promise<void>;
  getPublicById(req: Request, res: Response, next: NextFunction): Promise<void>;
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  setStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
  delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface IChatController {
  getByUserId(req: Request, res: Response, next: NextFunction): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
}

export interface IMessageController {
  getByChatId(req: Request, res: Response, next: NextFunction): Promise<void>;
  createMessage(req: Request, res: Response, next: NextFunction): Promise<void>;
}
