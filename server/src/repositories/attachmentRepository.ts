import { inject, injectable } from "inversify";
import { TYPES } from "../types/inversify";
import { Knex } from "knex";
import { IAttachmentRepository } from "../types/core";

@injectable()
export default class AttachmentRepository implements IAttachmentRepository {
  constructor(@inject(TYPES.Db) private db: Knex) {}

  async saveAttachments(messageId: number, attachmentRecords?: any[]) {
    if (!(attachmentRecords && attachmentRecords.length)) return;

    try {
      const [attachments] = await this.db("message_attachments")
        .insert(attachmentRecords)
        .returning("*");
      return attachments;
    } catch (error: any) {
      throw new Error("Failed to save attachments");
    }
  }

  async getAttachmentsByChatId(chatId: number) {
    try {
      const attachments = await this.db("message_attachments")
        .select("*")
        .join("message", "message.id", "message_attachments.message_id")
        .where("message.chat_id", chatId);

      return attachments;
    } catch (error: any) {
      throw new Error("Failed to retrieve attachments");
    }
  }
}