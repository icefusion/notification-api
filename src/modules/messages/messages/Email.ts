import { Message } from "./Message";
import { container } from 'tsyringe';
import MessageLogService from "@modules/logs/services/MessageLogService";
import { IUserMessageLogDTO } from "@modules/auth/dtos/IUserMessageLogDTO";

export class Email extends Message {
  protected subject: string;
  protected from: string;

  constructor(from: string, to: string, subject: string, message: string, user: IUserMessageLogDTO) {
    super(to, message, user);
    this.from = from;
    this.subject = subject;
  }

  async send() {
    const messageLogService = container.resolve(MessageLogService);

    const payload = {
      from: this.from,
      to: this.to,
      subject: this.subject,
      message: this.message,
      channel: this.user.channel,
      inscriptions: this.user.inscriptions,
      user_id: this.user.user_id,
      user_name: this.user.user_name,
      created_at: new Date()
    };

    await messageLogService.generate(payload);

    console.log(`Sending email from ${this.from} to ${this.to} with subject "${this.subject}": ${this.message}`);
  }
}
