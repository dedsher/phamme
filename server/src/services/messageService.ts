import { inject, injectable } from "inversify";
import { uploadFile } from "../ycs";
import { TYPES } from "../types/inversify";
import { IAttachmentRepository, IMessageRepository, IMessageService } from "../types/core";

@injectable()
export default class MessageService implements IMessageService {
  constructor(
    @inject(TYPES.MessageRepository)
    private messageRepository: IMessageRepository,
    @inject(TYPES.AttachmentRepository)
    private attachmentRepository: IAttachmentRepository
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

    let createdAttachments: [] = [];

    if (attachments && attachments.length > 0) {
      const attachmentRecords = await Promise.all(
        attachments.map(async (file) => {
          const url = await uploadFile(file);
          return { message_id: message.id, url };
        })
      );

      const createdAttachments =
        await this.attachmentRepository.saveAttachments(
          message.id,
          attachmentRecords
        );
    }

    return { message: message, attachments: createdAttachments };
  }
}
