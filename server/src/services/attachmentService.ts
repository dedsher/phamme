import { inject, injectable } from "inversify";
import { TYPES } from "../types/inversify";
import {
  IAttachmentRepository,
  IAttachmentService,
  IMessageRepository,
  IMessageService,
} from "../types/core";

@injectable()
export default class AttachmentService implements IAttachmentService {
  constructor(
    @inject(TYPES.AttachmentRepository)
    private attachmentRepository: IAttachmentRepository
  ) {}

  async getByChatId(chatId: number) {
    const attachments = await this.attachmentRepository.getByChatId(chatId);

    if (!attachments) {
      throw Error("No attachments found");
    }

    return attachments;
  }
}
