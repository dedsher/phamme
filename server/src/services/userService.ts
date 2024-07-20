import { User } from "../models/userModel";
import {
  comparePasswords,
  generateJWT,
  generateVerificationToken,
  getIdByVerificationToken,
} from "../utils/auth";
import { sendMail } from "../utils/mailer";
import { inject, injectable } from "inversify";
import { TYPES } from "../types/inversify";
import { IUserRepository, IUserService } from "../types/core";
import { jwtDecode } from "jwt-decode";

@injectable()
export default class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}

  async getAll() {
    const users = await this.userRepository.getAll();

    if (!users) {
      throw new Error("No users found");
    }

    return users;
  }

  async getUsersForSearch(userId: number) {
    const users = await this.userRepository.getUsersForSearch(userId);

    if (!users) {
      throw new Error("No users found");
    }

    return users;
  }

  async getUserProfileById(id: number) {
    const user = await this.userRepository.getUserProfileById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async getById(id: string) {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async getPublicById(id: number) {
    const user = await this.userRepository.getPublicById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async setStatus(id: number, status: string) {
    const user = await this.userRepository.setStatus(id, status);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async getContacts(id: number) {
    const contacts = await this.userRepository.getContacts(id);

    if (!contacts) {
      throw new Error("User not found");
    }

    if (contacts.length === 0) return [] as number[];

    const parsedContacts = contacts.map((contact) => parseInt(contact.id as string, 10));

    return parsedContacts;
  }

  async register(user: User): Promise<User | null> {
    const existingUser = await this.userRepository.getByEmail(user.email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const createdUser = await this.userRepository.create(user);

    if (!createdUser) {
      throw new Error("Error creating user");
    }

    const verificationToken = generateVerificationToken(createdUser.id!);

    sendMail(createdUser.email, verificationToken);

    return createdUser;
  }

  async login(login: string, password: string) {
    let user: User | null = null;

    if (login.includes("@")) {
      user = await this.userRepository.getByEmail(login);
    } else {
      user = await this.userRepository.getByUsername(login);
    }

    if (!user) {
      throw new Error("User not found");
    }

    // const isVerified = this.userRepository.isVerified(Number(user.id));

    // if (!isVerified) {
    //   throw new Error("User not verified");
    // }

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const { accessToken, refreshToken } = generateJWT(user);

    const savedRefreshToken = await this.userRepository.saveRefreshToken(
      Number(user.id),
      refreshToken
    );

    if (!savedRefreshToken) {
      throw new Error("Error saving refresh token");
    }

    return { accessToken, refreshToken };
  }

  async logout(refreshToken: string) {
    const user = await this.userRepository.deleteRefreshToken(refreshToken);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async refresh(refreshToken: string) {
    const user: any = await this.userRepository.getByRefreshToken(refreshToken);

    if (!user) {
      throw new Error("User not found");
    }

    if (refreshToken !== user.refresh_token) {
      throw new Error("Invalid refresh token");
    }

    const decodedRefresh = jwtDecode(refreshToken);

    if (decodedRefresh.exp! < Date.now() / 1000) {
      throw new Error("Refresh token expired");
    }

    const { accessToken } = generateJWT(user);

    return accessToken;
  }

  async verifyUser(token: string) {
    const userId = getIdByVerificationToken(token);

    const user = await this.userRepository.verifyUser(Number(userId));

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async update(id: string, user: User) {
    const existingUser = await this.userRepository.getById(id);

    if (!existingUser) {
      throw new Error("User not found");
    }

    return existingUser;
  }

  async delete(id: string) {
    const user = await this.userRepository.delete(id);

    if (user === null) {
      throw new Error("User not found");
    }

    return user;
  }
}
