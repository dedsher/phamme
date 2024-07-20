import { ERROR_MESSAGE } from "../constants/errorMessage";
import { User, UserData } from "../models/userModel";
import { hashPassword } from "../utils/auth";
import { inject, injectable } from "inversify";
import { TYPES } from "../types/inversify";
import { Knex } from "knex";
import { IUserRepository } from "../types/core";

const { USER: USER_ERROR } = ERROR_MESSAGE;

@injectable()
export default class UserRepository implements IUserRepository {
  constructor(@inject(TYPES.Db) private db: Knex) {}

  async getAll(): Promise<User[] | null> {
    try {
      const users = await this.db("user").select("*");
      return users.length === 0 ? null : users;
    } catch (error) {
      throw new Error(USER_ERROR.RETRIEVE);
    }
  }

  async getUsersForSearch(userId: number): Promise<User[] | null> {
    try {
      const users = await this.db("user")
        .select("id", "firstname", "lastname", "status", "avatar_url")
        .whereNot("id", userId);
      return users.length === 0 ? [] : users;
    } catch (error) {
      throw new Error(USER_ERROR.RETRIEVE);
    }
  }

  async getUserProfileById(id: number): Promise<User | null> {
    try {
      const user = await this.db("user")
        .where("user.id", id)
        .select(
          "user.id",
          "user.firstname",
          "user.lastname",
          "user.username",
          "user.avatar_url",
          "user.last_seen",
          "user.status",
          "user.email",
          "user.bio",
          "user.solana_wallet_address as wallet",
        )
        .first();

      return user || null;
    } catch (error) {
      throw new Error(USER_ERROR.RETRIEVE_BY_ID);
    }
  }

  async getById(id: string): Promise<User | null> {
    try {
      const user = await this.db("user").where({ id }).first();
      return user || null;
    } catch (error) {
      throw new Error(USER_ERROR.RETRIEVE_BY_ID);
    }
  }

  async getPublicById(id: number): Promise<User | null> {
    try {
      const user = await this.db("user")
        .where({ id })
        .select(
          "id",
          "username",
          "firstname",
          "lastname",
          "email",
          "avatar_url",
          "status",
          "last_seen"
        )
        .first();
      return user || null;
    } catch (error) {
      throw new Error(USER_ERROR.RETRIEVE_BY_ID);
    }
  }

  async getByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.db("user").where({ email }).first();
      return user || null;
    } catch (error) {
      throw new Error(USER_ERROR.RETRIEVE_BY_EMAIL);
    }
  }

  async getByUsername(username: string): Promise<User | null> {
    try {
      const user = await this.db("user").where({ username }).first();
      return user || null;
    } catch (error) {
      throw new Error(USER_ERROR.RETRIEVE_BY_USERNAME);
    }
  }

  async getContacts(id: number): Promise<User[]> {
    try {
      const contacts = await this.db("chat_user as cu")
        .join("chat_user as other_cu", "cu.chat_id", "other_cu.chat_id")
        .where("cu.user_id", id)
        .where("other_cu.user_id", "!=", id)
        .select("other_cu.user_id as id");

      return contacts.length === 0 ? [] : contacts;
    } catch (error) {
      throw new Error(USER_ERROR.RETRIEVE_CONTACTS);
    }
  }

  async create(user: UserData): Promise<User | null> {
    try {
      user.password = await hashPassword(user.password);
      user.avatar_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Anonymous.svg/800px-Anonymous.svg.png";
      const createdUser = await this.db.transaction(async (trx) => {
        const [newUser] = await trx("user").insert(user).returning("*");
        await trx("auth").insert({ user_id: newUser.id });
        return newUser;
      });
      return createdUser || null;
    } catch (error) {
      throw new Error(USER_ERROR.CREATE);
    }
  }

  async setStatus(id: number, status: string): Promise<User | null> {
    try {
      let updatedUser;

      if (status === "online") {
        [updatedUser] = await this.db("user")
          .where({ id })
          .update({ status })
          .returning("*");
      } else {
        [updatedUser] = await this.db("user")
          .where({ id })
          .update({ last_seen: new Date().toISOString(), status: "offline" })
          .returning("*");
      }

      return updatedUser || null;
    } catch (error) {
      throw new Error(USER_ERROR.STATUS);
    }
  }

  async verifyUser(id: number): Promise<User | null> {
    try {
      const [updatedUser] = await this.db("auth")
        .where({ user_id: id })
        .update({ is_verified: true })
        .returning("*");
      return updatedUser || null;
    } catch (error) {
      throw new Error(USER_ERROR.VERIFY);
    }
  }

  async isVerified(id: number): Promise<boolean> {
    try {
      const authInfo = await this.db("auth").where({ id }).first();
      return authInfo.verified;
    } catch (error) {
      throw new Error(USER_ERROR.VERIFY);
    }
  }

  async getByRefreshToken(refreshToken: string): Promise<User | null> {
    try {
      const user = await this.db("auth")
        .where({ refresh_token: refreshToken })
        .join("user as u", "auth.user_id", "=", "u.id")
        .select("u.id", "u.email", "auth.refresh_token")
        .first();

      return user || null;
    } catch (error) {
      throw new Error(USER_ERROR.RETRIEVE_BY_REFRESH_TOKEN);
    }
  }

  async deleteRefreshToken(refreshToken: string): Promise<User | null> {
    try {
      const [deletedRefresh] = await this.db("auth")
        .where({ refresh_token: refreshToken })
        .update({ refresh_token: null })
        .returning("refresh_token");
      return deletedRefresh || null;
    } catch (error) {
      throw new Error(USER_ERROR.DELETE);
    }
  }

  async saveRefreshToken(
    id: number,
    refreshToken: string
  ): Promise<User | null> {
    try {
      const [updatedToken] = await this.db("auth")
        .where({ user_id: id })
        .update({ refresh_token: refreshToken })
        .returning("refresh_token");

      return updatedToken["refresh_token"] || null;
    } catch (error) {
      throw new Error(USER_ERROR.UPDATE);
    }
  }

  async update(id: string, user: User): Promise<User | null> {
    try {
      const [updatedUser] = await this.db("user")
        .where({ id })
        .update(user)
        .returning("*");
      return updatedUser || null;
    } catch (error) {
      throw new Error(USER_ERROR.UPDATE);
    }
  }

  async delete(id: string): Promise<User | null> {
    try {
      const [deletedUser] = await this.db("user")
        .where({ id })
        .del()
        .returning("*");
      return deletedUser || null;
    } catch (error) {
      throw new Error(USER_ERROR.DELETE);
    }
  }
}
