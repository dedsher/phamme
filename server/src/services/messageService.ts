import { inject, injectable } from "inversify";
import { uploadFile } from "../ycs";
import { TYPES } from "../types/inversify";
import {
  IAttachmentRepository,
  IChatRepository,
  IMessageRepository,
  IMessageService,
} from "../types/core";

@injectable()
export default class MessageService implements IMessageService {
  constructor(
    @inject(TYPES.MessageRepository)
    private messageRepository: IMessageRepository,
    @inject(TYPES.AttachmentRepository)
    private attachmentRepository: IAttachmentRepository,
    @inject(TYPES.ChatRepository) private chatRepository: IChatRepository
  ) {}

  async getByChatId(chatId: number) {
    const messages = await this.messageRepository.getByChatId(chatId);

    if (!messages) {
      throw Error("No messages found");
    }

    return messages;
  }

  async createMessage(messageObj: any, attachments?: any[]) {
    const message = await this.messageRepository.createMessage(messageObj);

    if (!message) {
      throw Error("Message was not created");
    }

    let createdAttachments: any[] | null = null;

    if (attachments && attachments.length > 0) {
      const attachmentRecords = await Promise.all(
        attachments.map(async (file) => {
          const { type, url, fileName } = await uploadFile(file);
          return { message_id: message.id, name: fileName, url, type };
        })
      );

      createdAttachments = await this.attachmentRepository.saveAttachments(
        message.id,
        attachmentRecords
      );
    }

    return { message: message, attachments: createdAttachments };
  }

  async updateMessage(messageId: number, content: string) {
    const message = await this.messageRepository.updateMessage(
      messageId,
      content
    );

    const isMessageLast = await this.messageRepository.isMessageLast(messageId);

    if (isMessageLast) {
      const chatId = await this.messageRepository.getChatIdByMessageId(
        messageId
      );

      const chat = await this.chatRepository.getById(chatId);

      if (!chat) {
        throw Error("Chat was not found");
      }

      chat.last_message = content;
      await this.chatRepository.updateLastMessage(chat);
    }

    if (!message) {
      throw Error("Message was not updated");
    }

    return message;
  }

  async markMessageAsRead(messageId: number) {
    const message = await this.messageRepository.markMessageAsRead(messageId);

    if (!message) {
      throw Error("Message was not marked as read");
    }

    return message;
  }

  async getChatIdByMessageId(messageId: number) {
    const chatId = await this.messageRepository.getChatIdByMessageId(messageId);

    if (!chatId) {
      throw Error("Chat ID was not found");
    }

    return chatId;
  }
}
