import { User } from "../models/userModel";
import {
  comparePasswords,
  generateJWT,
  generateVerificationToken,
  getIdByVerificationToken,
  sendMail,
} from "../../utils/auth";
import { inject, injectable } from "inversify";
import { TYPES } from "../types/inversify";
import { IUserRepository, IUserService } from "../types/core";

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

  async setStatus(id: number, status: string) {
    const user = await this.userRepository.setStatus(id, status);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
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

    const isVerified = this.userRepository.isVerified(Number(user.id));

    if (!isVerified) {
      throw new Error("User not verified");
    }

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const { accessToken, refreshToken } = generateJWT(user);

    const savedRefreshToken = this.userRepository.saveRefreshToken(
      Number(user!),
      refreshToken
    );

    if (!savedRefreshToken) {
      throw new Error("Error saving refresh token");
    }

    return { accessToken, refreshToken };
  }

  async verifyUser(token: string) {
    const userId = getIdByVerificationToken(token);

    const user = await this.userRepository.verifyUser(userId);

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
