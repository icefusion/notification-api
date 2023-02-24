import { sign } from "jsonwebtoken";
import authConfig from "@config/config";
import { injectable, inject } from "tsyringe";
import "dotenv/config";

import AppError from "@shared/errors/AppError";

import IAdminRepository from '@modules/admins/repositories/IAdminsRepository';

import IHashProvider from "@modules/admins/providers/HashProvider/models/IHashProvider";
import Admin from "@modules/admins/infra/typeorm/schemas/Admin";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Admin;
  token: string;
}

@injectable()
class AuthService {
  constructor(
    @inject("AdminRepository")
    private adminsRepository: IAdminRepository,

    @inject("BCryptHashProvider")
    private bcryptHashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    await this.generateAdminUsersAtDatabase();

    const user = await this.adminsRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const passwordMatched = await this.bcryptHashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const userData = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    }

    const token = sign(
      { user: userData },
      secret, {
        subject: user._id.toString(),
        expiresIn,
      }
    );

    return {
      user,
      token,
    };
  }

  private async generateAdminUsersAtDatabase(): Promise<void> {
    const admins = await this.adminsRepository.existAdminUser();

    const hashedPassword = await this.bcryptHashProvider.generateHash(
      "123456"
    );

    if (!admins || admins.length === 0) {
      await this.adminsRepository.create({
        name: "Administrator",
        email: "admin@gmail.com",
        password: hashedPassword
      })
    }
  }
}

export default AuthService;
