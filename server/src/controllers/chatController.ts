import { NextFunction, Request, Response } from "express";
import ChatService from "../services/chatService";
import { ERROR_MESSAGE } from "../constants/errorMessage";
import { RESPONSE_STATUS } from "../constants/responseStatus";
import { inject } from "inversify";
import { TYPES } from "../types/inversify";
import { controller, httpGet, interfaces } from "inversify-express-utils";

const { CHAT: CHAT_ERROR } = ERROR_MESSAGE;

@controller("/chats", TYPES.AuthenticateToken)
export default class ChatController implements interfaces.Controller {
  constructor(@inject(TYPES.ChatService) private chatService: ChatService) {}

  @httpGet("/user/:userId")
  async getByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      const userChats = await this.chatService.getByUserId(userId);
      res.status(RESPONSE_STATUS.OK).json(userChats);
    } catch (error: any) {
      if (error.message === CHAT_ERROR.RETRIEVE_BY_USER_ID) {
        res
          .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
          .json({ message: CHAT_ERROR.RETRIEVE_BY_USER_ID });
      } else {
        next(error);
      }
    }
  }

  async create(req: Request, res: Response) {
    try {
      const chat = req.body;
      const newChat = await this.chatService.create(chat);
      res.status(RESPONSE_STATUS.CREATED).json(newChat);
    } catch (error) {
      // const appError = error as AppError;
      // res
      //   .status(appError.status || RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      //   .json({ message: appError.message || CHAT_ERROR.CREATE });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const chat = req.body;
      const updatedChat = await this.chatService.update(id, chat);
      res.status(RESPONSE_STATUS.OK).json(updatedChat);
    } catch (error) {
      // const appError = error as AppError;
      // res
      //   .status(appError.status || RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      //   .json({ message: appError.message || CHAT_ERROR.UPDATE });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const deletedChat = await this.chatService.delete(id);
      res.status(RESPONSE_STATUS.OK).json(deletedChat);
    } catch (error) {
      // const appError = error as AppError;
      // res
      //   .status(appError.status || RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      //   .json({ message: appError.message || CHAT_ERROR.DELETE });
    }
  }
}
