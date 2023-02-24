import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";
import AuthService from "@modules/auth/services/AuthService";

export default class AuthController {
  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authService = container.resolve(AuthService);

    const user = await authService.execute({
      email,
      password,
    });

    return response.json(classToClass(user));
  }
}
