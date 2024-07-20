import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGE } from "../constants/errorMessage";
import { RESPONSE_STATUS } from "../constants/responseStatus";
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  interfaces,
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../types/inversify";
import { ITransactionService } from "../types/core";
const { USER: USER_ERROR } = ERROR_MESSAGE;

@controller("/transactions", TYPES.AuthenticateToken)
export default class TransactionsController implements interfaces.Controller {
  constructor(
    @inject(TYPES.TransactionService)
    private transactionService: ITransactionService
  ) {}

  @httpGet("/:id")
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.params.id;
      const transactions = await this.transactionService.getAllByUserId(
        Number(userId)
      );
      res.status(RESPONSE_STATUS.OK).json(transactions);
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

  @httpGet("/:id/friends")
  async getFriends(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.params.id;
      const friends = await this.transactionService.getFriends(Number(userId));
      res.status(RESPONSE_STATUS.OK).json(friends);
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

  @httpPut("/add-wallet/:id")
  async addWallet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.params.id;
      const wallet = req.body.wallet;
      const updatedWallet = await this.transactionService.addWallet(
        Number(userId),
        wallet
      );
      res.status(RESPONSE_STATUS.OK).json(updatedWallet);
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

  @httpPut("/delete-wallet/:id")
  async deleteWallet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.params.id;
      const deletedWallet = await this.transactionService.deleteWallet(
        Number(userId)
      );
      res.status(RESPONSE_STATUS.OK).json(deletedWallet);
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

  @httpPost("/:id")
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.body;
      const newUser = await this.transactionService.create(user);
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
}
