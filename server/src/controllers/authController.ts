import { controller, httpGet, httpPost } from "inversify-express-utils";
import { IUserService } from "../types/core";
import { inject } from "inversify";
import { TYPES } from "../types/inversify";
import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGE } from "../constants/errorMessage";
import { RESPONSE_STATUS } from "../constants/responseStatus";

const { AUTH: AUTH_ERROR } = ERROR_MESSAGE;

@controller("/auth")
export default class AuthController {
  constructor(@inject(TYPES.UserService) private userService: IUserService) {}

  @httpPost("/login")
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { login, password } = req.body;
      const { accessToken, refreshToken } = await this.userService.login(
        login,
        password
      );

      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 15 * 24 * 60 * 60 * 1000,
        })
        .status(RESPONSE_STATUS.OK)
        .json({ message: "Login successful", accessToken });
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

  @httpGet("/refresh")
  async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;
      const token = await this.userService.refresh(refreshToken);

      res.status(RESPONSE_STATUS.OK).json({ token });
    } catch (error: any) {
      if (error.message === AUTH_ERROR.REFRESH) {
        res
          .status(RESPONSE_STATUS.UNAUTHORIZED)
          .json({ message: AUTH_ERROR.REFRESH });
      } else {
        next(error);
      }
    }
  }

  @httpPost("/register")
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.body;
      await this.userService.register(user);

      res.status(RESPONSE_STATUS.OK).json("Register successful");
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

  @httpPost("/verification/:token")
  async verify(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.params.token;
      const user = await this.userService.verifyUser(token);
      res.status(RESPONSE_STATUS.OK).json(user);
    } catch (error: any) {
      if (error.message === AUTH_ERROR.VERIFY) {
        res
          .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
          .json({ message: AUTH_ERROR.VERIFY });
      } else {
        next(error);
      }
    }
  }
}
