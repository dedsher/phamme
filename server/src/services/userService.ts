import { User } from "../models/userModel";
import { comparePasswords, generateJWT } from "../../utils/auth";
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

  async create(user: User): Promise<User | null> {
    const existingUser = await this.userRepository.getByEmail(user.email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    return await this.userRepository.create(user);
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

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return generateJWT(user);
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
