import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import User from "../infra/typeorm/entities/User";

interface IRequest {
  name: string;
  email: string;
  password: string;
  role_id: string;
}

@injectable()
class UserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("BCryptHashProvider")
    private bCryptHashProvider: IHashProvider
  ) {}

  public async findById(id: string): Promise<User | null> {
    return this.usersRepository.findById(id);
  }

  public async list(): Promise<User[]> {
    return this.usersRepository.list();
  }

  public async create({
    name,
    email,
    password,
    role_id,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("Email address already used.");
    }

    const hashedPassword = await this.bCryptHashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      role_id,
    });

    return user;
  }

  public async update(
    id: string,
    { name, email, password }: IRequest
  ): Promise<User | null> {
    const checkUserExists = await this.usersRepository.findById(id);

    if (!checkUserExists) {
      throw new AppError("User not found.");
    }

    const hashedPassword = await this.bCryptHashProvider.generateHash(password);

    const user = await this.usersRepository.update(id, {
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }

  public async delete(id: string): Promise<User | null> {
    const checkUserExists = await this.usersRepository.findById(id);

    if (!checkUserExists) {
      throw new AppError("User not exists.");
    }

    const user = await this.usersRepository.delete(id);

    return user;
  }
}

export default UserService;
