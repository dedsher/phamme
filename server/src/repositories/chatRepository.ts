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

  async getAll(): Promise<Chat[] | null> {
    try {
      const chats = await this.db("chat").select("*");
      return chats.length === 0 ? null : chats;
    } catch (error) {
      throw new Error(CHAT_ERROR.RETRIEVE);
    }
  }

  async getAllByIds(ids: number[]): Promise<Chat[] | null> {
    try {
      const chats = await this.db("chat").whereIn("id", ids);
      return chats.length === 0 ? null : chats;
    } catch (error) {
      throw new Error(CHAT_ERROR.RETRIEVE_BY_IDS);
    }
  }

  async getById(id: string): Promise<Chat | null> {
    try {
      const chat = await this.db("chat").where({ id }).first();
      return chat || null;
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
          "chat.last_message",
          "chat.last_message_at",
          "chat.last_message_author_id",
          "chat.unread_count",
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

  async update(id: string, chat: Chat): Promise<Chat> {
    try {
      const [updatedChat] = await this.db("chat")
        .where({ id })
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
