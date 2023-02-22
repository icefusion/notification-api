import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";
import UserService from "@modules/users/services/UserService";
import CreateLogService from "@shared/services/createLog/services/CreateLogService";

export default class UsersController {
  public async findById(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    const userService = container.resolve(UserService);

    const user = await userService.findById(id);

    return response.json(classToClass(user));
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const userService = container.resolve(UserService);

    const users = await userService.list();

    return response.json(classToClass(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, role_id } = request.body;

    const userService = container.resolve(UserService);
    const createLogService = container.resolve(CreateLogService);

    const user = await userService.create({
      name,
      email,
      password,
      role_id,
    });

    await createLogService.create("User Created", user.id);

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, role_id } = request.body;

    const { id } = request.params;

    const userService = container.resolve(UserService);

    const user = await userService.update(id, {
      name,
      email,
      password,
      role_id,
    });

    return response.json(classToClass(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const userService = container.resolve(UserService);

    const user = await userService.delete(id);

    return response.json(classToClass(user));
  }
}
