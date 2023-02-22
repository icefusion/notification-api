import { injectable, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { MessageFactory } from '../messages/MessageFactory';
import { IMessageRequest } from '../messages/interfaces/IMessageRequest';
import ICreateMessage from '../interfaces/ICreateMessage';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUser } from '../../users/infra/typeorm/interfaces/IUser';
import { ChannelEnum } from '../enums/ChannelEnum';
import config from '@config/config';

@injectable()
class MessageService {
  public async create(request: ICreateMessage): Promise<any> {
    const userRepository = container.resolve(UsersRepository);

    const users = await userRepository.filterByCategory(request.categories);

    if (!users) {
      new AppError('No users found for this categories.');
    }

    await this.processMessages(users, request.subject ?? '', request.message);
  }

  private async processMessages(users: IUser[], subject: string, message: string) {
    for (const user of users) {
      for (const channel of user.channels) {
        
        const messageData = await this.prepareData(user, channel, subject, message);

        if (messageData) {
          await this.send(messageData);
        }
      }
    }
  }

  private async prepareData(user: IUser, channel: string, subject: string, message: string) {
    switch (channel) {
      case ChannelEnum.email:
        return {
          type: channel,
          from: config.senders.email,
          to: user.email,
          subject: subject,
          message: message,
          user: {
            channel: channel,
            inscriptions: user.inscriptions,
            user_id: user.id,
            user_name: user.name,
          }
        }
      
      case ChannelEnum.sms: 
        return {
          type: channel,
          from: config.senders.number,
          to: user.phone,
          message: message,
          user: {
            channel: channel,
            inscriptions: user.inscriptions,
            user_id: user.id,
            user_name: user.name,
          }
        }

      case ChannelEnum.push: 
        return {
          type: channel,
          to: user.device,
          message: message,
          user: {
            channel: channel,
            inscriptions: user.inscriptions,
            user_id: user.id,
            user_name: user.name,
          }
        }

      default: 
        return null;
    }
  }

  private async send(data: IMessageRequest): Promise<any> {
    const messageFactory = new MessageFactory();

    const message = messageFactory.createMessage(data);

    return message.send();
  }
}

export default MessageService;
