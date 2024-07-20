import ChatRepository from "../repositories/chatRepository";
import { Chat } from "../models/chatModel";
import { inject, injectable } from "inversify";
import { TYPES } from "../types/inversify";
import { IChatService } from "../types/core";

@injectable()
export default class ChatService implements IChatService {
  constructor(
    @inject(TYPES.ChatRepository) private chatRepository: ChatRepository
  ) {}
  
  async getByUserId(userId: number) {
    const chats = await this.chatRepository.getByUserId(userId);

    if (!chats) {
      throw new Error("No chats found");
    }

    return chats;
  }

  async create(chat: Chat) {
    return await this.chatRepository.create(chat);
  }

  async updateLastMessage(chat: any) {
    return await this.chatRepository.updateLastMessage(chat);
  }

  async delete(id: string) {
    return await this.chatRepository.delete(id);
  }
}
