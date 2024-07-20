import { ERROR_MESSAGE } from "../constants/errorMessage";
import { inject, injectable } from "inversify";
import { TYPES } from "../types/inversify";
import { Knex } from "knex";
import { ITransactionRepository } from "../types/core";

const { USER: USER_ERROR } = ERROR_MESSAGE;

@injectable()
export default class TransactionRepository implements ITransactionRepository {
  constructor(@inject(TYPES.Db) private db: Knex) {}

  async getAllByUserId(userId: number): Promise<any[]> {
    try {
      const transactions = await this.db("solana_transaction")
        .where({ from: userId })
        .orWhere({ to: userId })
        .join("user as u1", "u1.id", "solana_transaction.from")
        .join("user as u2", "u2.id", "solana_transaction.to")
        .select(
          "from",
          "to",
          "amount",
          "u1.firstname as from_firstname",
          "u1.lastname as from_lastname",
          "u2.firstname as to_firstname",
          "u2.lastname as to_lastname",
          "solana_transaction.created_at"
        );
      return transactions;
    } catch (error) {
      throw new Error(USER_ERROR.RETRIEVE);
    }
  }

  async getFriends(userId: number): Promise<any[]> {
    try {
      const friends = await this.db("user")
        .join("chat_user as cu1", "cu1.user_id", "user.id")
        .join("chat_user as cu2", "cu2.chat_id", "cu1.chat_id")
        .where("cu2.user_id", userId)
        .andWhereNot("user.id", userId)
        .andWhereNot("user.solana_wallet_address", null)
        .select("user.firstname", "user.lastname");
      return friends;
    } catch (error) {
      throw new Error(USER_ERROR.RETRIEVE);
    }
  }

  async addWallet(userId: number, wallet: string): Promise<string | null> {
    try {
      const [updatedWallet] = await this.db("user")
        .where({ id: userId })
        .update({ solana_wallet_address: wallet })
        .returning("solana_wallet_address");
      return updatedWallet || null;
    } catch (error) {
      throw new Error(USER_ERROR.UPDATE);
    }
  }

  async deleteWallet(userId: number): Promise<string | null> {
    try {
      const [deletedWallet] = await this.db("user")
        .where({ id: userId })
        .update({ solana_wallet_address: null })
        .returning("solana_wallet_address");
      return deletedWallet || null;
    } catch (error) {
      throw new Error(USER_ERROR.UPDATE);
    }
  }

  async create(transaction: any): Promise<any> {
    try {
      const [newTransaction] = await this.db("solana_transaction")
        .insert(transaction)
        .returning("*");
      return newTransaction;
    } catch (error) {
      throw new Error(USER_ERROR.CREATE);
    }
  }
}
