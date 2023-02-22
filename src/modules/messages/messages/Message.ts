import { IMessage } from './interfaces/IMessage';
import { IUserMessageLogDTO } from '@modules/users/dtos/IUserMessageLogDTO';

export abstract class Message implements IMessage {
  to: string;
  message: string;
  user: IUserMessageLogDTO;

  constructor(to: string, message: string, user: IUserMessageLogDTO) {
    this.to = to;
    this.message = message;
    this.user = user;
  }

  public async send() {
    console.log(`Sending message to ${this.to}: ${this.message}`);
  }
}

