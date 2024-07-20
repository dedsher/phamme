import { inject, injectable } from "inversify";
import { ERROR_MESSAGE } from "../constants/errorMessage";
import { Chat } from "../models/chatModel";
import { TYPES } from "../types/inversify";
import { Knex } from "knex";
import { IChatRepository } from "../types/core";

const { CHAT: CHAT_ERROR } = ERROR_MESSAGE;

@injectable()
export default class ChatRepository implements IChatRepository {
  constructor(@inject(TYPES.Db) private db: Knex) {}

  async getById(id: number): Promise<Chat> {
    try {
      const chat = await this.db("chat").where({ id }).first();
      return chat;
    } catch (error) {
      throw new Error(CHAT_ERROR.RETRIEVE_BY_ID);
    }
  }

  async getByUserId(userId: number): Promise<Chat[]> {
    try {
      const chats = await this.db("chat")
        .join("chat_user as cu", "chat.id", "cu.chat_id")
        .join("chat_user as other_cu", "chat.id", "other_cu.chat_id")
        .join("user as u", "other_cu.user_id", "u.id")
        .select(
          "chat.id",
          "u.firstname",
          "u.lastname",
          "u.avatar_url as avatar_url",
          "u.status",
          "chat.last_message",
          "chat.last_message_at",
          "chat.last_message_author_id",
          this.db.raw(`
            (SELECT COUNT(*) 
             FROM message 
             WHERE message.chat_id = chat.id 
               AND message.sender_id = other_cu.user_id 
               AND message.status = 'delivered') 
             AS unread_count`),
          "other_cu.user_id as friend_id"
        )
        .where("cu.user_id", userId)
        .andWhere("other_cu.user_id", "!=", userId)
        .orderBy("chat.last_message_at", "desc");

      return chats;
    } catch (error) {
      throw new Error(CHAT_ERROR.RETRIEVE_BY_USER_ID);
    }
  }

  async create(chat: Chat): Promise<Chat> {
    try {
      const [createdChat] = await this.db("chat").insert(chat).returning("*");
      return createdChat;
    } catch (error) {
      throw new Error(CHAT_ERROR.CREATE);
    }
  }

  async updateLastMessage(chat: Chat): Promise<Chat> {
    try {
      const [updatedChat] = await this.db("chat")
        .where({ id: chat.id })
        .update(chat)
        .returning("*");
      return updatedChat;
    } catch (error) {
      throw new Error(CHAT_ERROR.UPDATE);
    }
  }

  async delete(id: string): Promise<number> {
    try {
      const [deletedChat] = await this.db("chat")
        .where({ id })
        .del()
        .returning("*");
      return deletedChat;
    } catch (error) {
      throw new Error(CHAT_ERROR.DELETE);
    }
  }
}
