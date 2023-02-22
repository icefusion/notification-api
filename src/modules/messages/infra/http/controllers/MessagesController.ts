import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import MessageService from "@modules/messages/services/MessageService";

export default class MessageController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { categories, subject, message } = request.body;

    const messageService = container.resolve(MessageService);

    const sended = await messageService.create({
      categories,
      subject,
      message
    });

    return response.json(classToClass(sended));
  }
}
