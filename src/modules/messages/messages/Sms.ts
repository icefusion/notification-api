import { Message } from "./Message";
import MessageLogService from '../../logs/services/MessageLogService';
import { container } from 'tsyringe';
import { IUserMessageLogDTO } from '../../auth/dtos/IUserMessageLogDTO';

export class Sms extends Message {
  protected from: string;

  constructor(from: string, to: string, message: string, user: IUserMessageLogDTO) {
    super(to, message, user);
    this.from = from;
  }

  async send() {
    const messageLogService = container.resolve(MessageLogService);

    const payload = {
      from: this.from,
      to: this.to,
      message: this.message,
      channel: this.user.channel,
      inscription: this.user.inscription,
      user_id: this.user.user_id,
      user_name: this.user.user_name,
      created_at: new Date()
    };

    await messageLogService.generate(payload);

    console.log(`Sending sms from ${this.from} to ${this.to} with: ${this.message}`);
  }
}
