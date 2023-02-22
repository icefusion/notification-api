import { Message } from "./Message";
import { container } from 'tsyringe';
import MessageLogService from '../../logs/services/MessageLogService';
import { IUserMessageLogDTO } from '../../users/dtos/IUserMessageLogDTO';

export class PushNotification extends Message {
  constructor(to: string, message: string, user: IUserMessageLogDTO) {
    super(to, message, user);
  }

  async send() {
    const messageLogService = container.resolve(MessageLogService);
    
    const payload = {
      to: this.to,
      message: this.message,
      channel: this.user.channel,
      inscription: this.user.inscription,
      user_id: this.user.user_id,
      user_name: this.user.user_name,
      created_at: new Date() 
    };

    await messageLogService.generate(payload);

    console.log(`Sending push to ${this.to} with: ${this.message}`);
  }
}