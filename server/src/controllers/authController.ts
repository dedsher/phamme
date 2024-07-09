import { controller, httpPost } from "inversify-express-utils";
import { IUserService } from "../types/core";
import { inject } from "inversify";
import { TYPES } from "../types/inversify";
import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGE } from "constants/errorMessage";
import { RESPONSE_STATUS } from "constants/responseStatus";

const { AUTH: AUTH_ERROR } = ERROR_MESSAGE;

@controller("/auth")
export default class AuthController {
  constructor(@inject(TYPES.UserService) private userService: IUserService) {}

  @httpPost("/login")
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { login, password } = req.body;
      const token = await this.userService.login(login, password);

      res
        .status(RESPONSE_STATUS.OK)
        .json({ message: "Login successful", token });
    } catch (error: any) {
      if (error.message === AUTH_ERROR.LOGIN) {
        res
          .status(RESPONSE_STATUS.UNAUTHORIZED)
          .json({ message: AUTH_ERROR.LOGIN });
      } else if (error.message === "User not found") {
        res
          .status(RESPONSE_STATUS.NOT_FOUND)
          .json({ message: "User not found" });
      } else if (error.message === "Invalid password") {
        res
          .status(RESPONSE_STATUS.UNAUTHORIZED)
          .json({ message: "Invalid password" });
      } else {
        next(error);
      }
    }
  }

  @httpPost("/register")
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const user = req.body;
      const updatedUser = await this.userService.update(id, user);
      res.status(RESPONSE_STATUS.OK).json(updatedUser);
    } catch (error: any) {
      if (error.message === AUTH_ERROR.REGISTER) {
        res
          .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
          .json({ message: AUTH_ERROR.REGISTER });
      } else {
        next(error);
      }
    }
  }
}
