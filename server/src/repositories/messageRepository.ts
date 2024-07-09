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
      const messages = await this.db("message")
        .leftJoin(
          { reply_message: "message" },
          "message.reply_to",
          "reply_message.id"
        )
        .select(
          "message.id",
          "message.sender_id",
          "message.created_at",
          "message.content",
          "message.status",
          this.db.raw("COALESCE(reply_message.content, ?) as reply_to", [""])
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
      console.log(error);
      throw new Error(MESSAGE_ERROR.CREATE);
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
}
