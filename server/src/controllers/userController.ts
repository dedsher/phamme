import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGE } from "../constants/errorMessage";
import { RESPONSE_STATUS } from "../constants/responseStatus";
import { isMe } from "../../utils/auth";
import {
  controller,
  httpGet,
  httpPut,
  httpDelete,
  interfaces,
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../types/inversify";
import { IUserController } from "../types/core";

const { USER: USER_ERROR } = ERROR_MESSAGE;

@controller("/users", TYPES.AuthenticateToken)
export default class UserController implements interfaces.Controller  {
  constructor(@inject(TYPES.UserService) private userService: any) {}

  @httpGet("/")
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await this.userService.getAll();
      res.status(RESPONSE_STATUS.OK).json(users);
    } catch (error: any) {
      if (error.message === USER_ERROR.RETRIEVE) {
        res
          .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
          .json({ message: USER_ERROR.RETRIEVE });
      } else {
        next(error);
      }
    }
  }

  @httpGet("/:id")
  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;
      let user;
      const authHeader = req.headers["authorization"];
      const token = authHeader!.split(" ")[1];
      const isPublic = isMe(token!, id);

      if (isPublic) {
        user = await this.userService.getById(id);
      } else {
        user = await this.userService.getPublicById(Number(id));
      }

      if (!user) {
        res
          .status(RESPONSE_STATUS.NOT_FOUND)
          .json({ message: USER_ERROR.RETRIEVE_BY_ID });
      } else {
        res.status(RESPONSE_STATUS.OK).json(user);
      }
    } catch (error: any) {
      if (error.message === USER_ERROR.RETRIEVE_BY_ID) {
        res
          .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
          .json({ message: USER_ERROR.RETRIEVE_BY_ID });
      } else {
        next(error);
      }
    }
  }

  @httpPut("/:id")
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.body;
      const newUser = await this.userService.create(user);
      res
        .status(RESPONSE_STATUS.CREATED)
        .json({ message: "Registered", user: newUser });
    } catch (error: any) {
      if (error.message === USER_ERROR.CREATE) {
        res
          .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
          .json({ message: USER_ERROR.CREATE });
      } else if (error.message === "User already exists") {
        res
          .status(RESPONSE_STATUS.CONFLICT)
          .json({ message: "User already exists" });
      } else {
        next(error);
      }
    }
  }

  @httpDelete("/:id")
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const user = await this.userService.delete(id);
      res.status(RESPONSE_STATUS.OK).json(user);
    } catch (error: any) {
      if (error.message === USER_ERROR.DELETE) {
        res
          .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
          .json({ message: USER_ERROR.DELETE });
      } else {
        next(error);
      }
    }
  }
}
