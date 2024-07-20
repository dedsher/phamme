import { Request, Response, NextFunction } from "express";
import { RESPONSE_STATUS } from "../constants/responseStatus";
import { ERROR_MESSAGE } from "../constants/errorMessage";
import {
  controller,
  httpGet,
  interfaces,
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../types/inversify";
import { IAttachmentService } from "../types/core";

const { ATTACHMENT: ATTACHMENT_ERROR } = ERROR_MESSAGE;

@controller("/attachments", TYPES.AuthenticateToken)
export default class AttachmentController implements interfaces.Controller {
  constructor(
    @inject(TYPES.AttachmentService) private attachmentService: IAttachmentService
  ) {}

  @httpGet("/chat/:chatId")
  async getByChatId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const chatId = Number(req.params.chatId);
      const attachments = await this.attachmentService.getByChatId(chatId);

      res.status(RESPONSE_STATUS.OK).json(attachments);
    } catch (error: any) {
      if (error.message === ATTACHMENT_ERROR.RETRIEVE) {
        res
          .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
          .json({ message: ATTACHMENT_ERROR.RETRIEVE });
      } else {
        next(error);
      }
    }
  }
}