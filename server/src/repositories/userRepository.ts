import { ERROR_MESSAGE } from "../constants/errorMessage";
import { User, UserData } from "../models/userModel";
import { hashPassword } from "../../utils/auth";
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

  async create(user: UserData): Promise<User | null> {
    try {
      user.password = await hashPassword(user.password);
      const createdUser = await this.db.transaction(async (trx) => {
        const [newUser] = await trx("user").insert(user).returning("*");
        await trx("auth").insert({ user_id: newUser.id });
        return newUser;
      });
      return createdUser || null;
    } catch (error) {
      console.log(error);
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

      console.log("updated user", updatedUser);

      return updatedUser || null;
    } catch (error) {
      console.log("error", error);
      throw new Error(USER_ERROR.STATUS);
    }
  }

  async verifyUser(id: number): Promise<User | null> {
    try {
      const [updatedUser] = await this.db("auth")
        .where({ id })
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

  async saveRefreshToken(id: number, refreshToken: string): Promise<User | null> {
    try {
      const [updatedUser] = await this.db("auth")
        .where({ id })
        .update({ refresh_token: refreshToken })
        .returning("refresh_token");
      return updatedUser || null;
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
