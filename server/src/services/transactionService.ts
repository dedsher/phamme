import { inject, injectable } from "inversify";
import { TYPES } from "../types/inversify";
import { IUserRepository, ITransactionService, ITransactionRepository } from "../types/core";

@injectable()
export default class TransactionService implements ITransactionService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    @inject(TYPES.TransactionRepository) private transactionRepository: ITransactionRepository
  ) {}

  async getAllByUserId(userId: number): Promise<any[]> {
    const transactions = await this.transactionRepository.getAllByUserId(userId);

    if (!transactions) {
      throw new Error("No transactions found");
    }

    return transactions;
  }

  async getFriends(userId: number): Promise<any[]> {
    const friends = await this.transactionRepository.getFriends(userId);

    if (!friends) {
      throw new Error("No friends found");
    }

    return friends;
  }

  async addWallet(userId: number, wallet: any): Promise<string | null> {
    const updatedWallet = await this.transactionRepository.addWallet(userId, wallet);

    if (!updatedWallet) {
      throw new Error("Wallet not updated");
    }

    return updatedWallet;
  }

  async deleteWallet(userId: number): Promise<string | null> {
    const deletedWallet = await this.transactionRepository.deleteWallet(userId);

    if (!deletedWallet) {
      throw new Error("Wallet not deleted");
    }

    return deletedWallet;
  }

  async create(transaction: any): Promise<any> {
    const newTransaction = await this.transactionRepository.create(transaction);

    if (!newTransaction) {
      throw new Error("Transaction not created");
    }

    return newTransaction;
  }
}
