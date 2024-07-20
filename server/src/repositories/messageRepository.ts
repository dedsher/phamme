import { ERROR_MESSAGE } from "../constants/errorMessage";
import { Message } from "../models/messageModel";
import { inject, injectable } from "inversify";
import { TYPES } from "../types/inversify";
import { Knex } from "knex";
import { IMessageRepository } from "../types/core";

const { MESSAGE: MESSAGE_ERROR } = ERROR_MESSAGE;

@injectable()
export default class MessageRepository implements IMessageRepository {
  constructor(@inject(TYPES.Db) private db: Knex) {}

  async getByChatId(chatId: number): Promise<Message[]> {
    try {
      const messages = await this.db
        .with("reply_cte", (qb) => {
          qb.select("id", "content")
            .from("message")
            .where("content", "<>", "")
            .orWhereNull("content");
        })
        .from("message")
        .leftJoin(
          { reply_message: "reply_cte" },
          "message.reply_to",
          "reply_message.id"
        )
        .leftJoin({ sender: "user" }, "message.sender_id", "sender.id")
        .select(
          "message.id",
          "message.sender_id",
          "message.created_at",
          "message.content",
          "message.status",
          this.db.raw(
            `CASE 
        WHEN reply_message.content = '' THEN 'вложения' 
        ELSE reply_message.content 
      END as reply_to`
          ),
          this.db.raw(
            "CONCAT(sender.firstname, ' ', sender.lastname) as sender_name"
          ),
          "sender.avatar_url as sender_avatar_url"
        )
        .where("message.chat_id", chatId)
        .orderBy("message.created_at", "asc");

      return messages;
    } catch (error: any) {
      throw new Error(MESSAGE_ERROR.RETRIEVE);
    }
  }

  async createMessage(messageObj: any): Promise<Message> {
    try {
      const [message] = await this.db("message")
        .insert(messageObj)
        .returning("*");

      return message;
    } catch (error: any) {
      throw new Error(MESSAGE_ERROR.CREATE);
    }
  }

  async updateMessage(messageId: number, content: string): Promise<Message> {
    try {
      const [message] = await this.db("message")
        .where("id", messageId)
        .update({ content })
        .returning("*");

      return message;
    } catch (error: any) {
      throw new Error(MESSAGE_ERROR.UPDATE);
    }
  }

  async isMessageLast(messageId: number): Promise<boolean> {
    try {
      const [message] = await this.db("message")
        .where("id", messageId)
        .select("chat_id");

      const [lastMessage] = await this.db("message")
        .where("chat_id", message.chat_id)
        .orderBy("created_at", "desc")
        .select("id");

      return lastMessage.id === messageId;
    } catch (error: any) {
      throw new Error(MESSAGE_ERROR.RETRIEVE);
    }
  }

  async addAttachments(
    messageId: number,
    attachments: string[]
  ): Promise<void> {
    try {
      const attachmentRecords = attachments.map((url) => ({
        message_id: messageId,
        url,
      }));

      await this.db("attachments").insert(attachmentRecords);
    } catch (error: any) {
      throw new Error("Failed to save attachments");
    }
  }

  async markMessageAsRead(messageId: number): Promise<Message> {
    try {
      const [message] = await this.db("message")
        .where("id", messageId)
        .update({ status: "read" })
        .returning("*");

      return message;
    } catch (error: any) {
      throw new Error(MESSAGE_ERROR.UPDATE);
    }
  }

  async getChatIdByMessageId(messageId: number): Promise<number> {
    try {
      const [chatId] = await this.db("message")
        .where("id", messageId)
        .select("chat_id");

      return chatId.chat_id;
    } catch (error: any) {
      throw new Error(MESSAGE_ERROR.RETRIEVE);
    }
  }
}
