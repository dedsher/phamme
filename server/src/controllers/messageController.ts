import { Request, Response, NextFunction } from "express";
import { RESPONSE_STATUS } from "../constants/responseStatus";
import { ERROR_MESSAGE } from "../constants/errorMessage";
import { Socket } from "socket.io";
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../types/inversify";
import { IMessageService } from "../types/core";

const { MESSAGE: MESSAGE_ERROR } = ERROR_MESSAGE;

@controller("/messages", TYPES.AuthenticateToken)
export default class MessageController implements interfaces.Controller {
  private io: Socket;

  constructor(
    @inject(TYPES.MessageService) private messageService: IMessageService,
    @inject(TYPES.io) io: Socket
  ) {
    this.io = io;
  }

  @httpGet("/chat/:chatId")
  async getByChatId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const chatId = Number(req.params.chatId);
      const messages = await this.messageService.getByChatId(chatId);

      res.status(RESPONSE_STATUS.OK).json(messages);
    } catch (error: any) {
      if (error.message === MESSAGE_ERROR.RETRIEVE) {
        res
          .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
          .json({ message: MESSAGE_ERROR.RETRIEVE });
      } else {
        next(error);
      }
    }
  }

  @httpPost("/chat/:chatId")
  async createMessage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const chatId = req.params.chatId;
      const { message } = req.body;
      const attachments = req.files as Express.Multer.File[];

      const messageObj = JSON.parse(message);

      const createdMessage = await this.messageService.createMessage(
        messageObj,
        attachments
      );

      this.io.to(chatId).emit("new message", createdMessage);

      res.status(RESPONSE_STATUS.CREATED).json(createdMessage);
    } catch (error: any) {
      if (error.message === MESSAGE_ERROR.CREATE) {
        res
          .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
          .json({ message: MESSAGE_ERROR.CREATE });
      } else {
        next(error);
      }
    }
  }
}
