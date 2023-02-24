import { injectable, container, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { MessageFactory } from '../messages/MessageFactory';
import { IMessageRequest } from '../messages/interfaces/IMessageRequest';
import ICreateMessage from '../interfaces/ICreateMessage';
import { IUser } from '../../auth/infra/typeorm/interfaces/IUser';
import { ChannelEnum } from '../enums/ChannelEnum';
import config from '@config/config';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/schemas/User';

@injectable()
class MessageService {
  private users: IUser[];

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async create(request: ICreateMessage): Promise<ICreateMessage> {
    await this.createUsers();

    const users = await this.usersRepository.filterByCategory(request.categories);

    if (!users) {
      new AppError('No users found for this categories.');
    }

    await this.processMessages(users, request.subject ?? '', request.message);

    return request;
  }

  private async createUsers() {
    const users = await this.usersRepository.filter();

    if (!users || users.length <= 0) {
      this.setUsers();

      for (const user of this.users) {
        await this.usersRepository.create({
          name: user.name,
          email: user.email,
          phone: user.phone,
          device: user.device,
          channels: user.channels,
          inscriptions: user.inscriptions
        })
      }
    }
  }

  private async processMessages(users: User[], subject: string, message: string) {
    for (const user of users) {
      for (const channel of user.channels) {

        const messageData = await this.prepareData(user, channel, subject, message);

        if (messageData) {
          await this.send(messageData);
        }
      }
    }
  }

  private async prepareData(user: User, channel: string, subject: string, message: string) {
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
            user_id: user._id.toString(),
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
            user_id: user._id.toString(),
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
            user_id: user._id.toString(),
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

  private setUsers() {
    this.users = [
      {
        name: "Willians",
        email: "will@gmail.com",
        phone: "+55 15 99123-1232",
        device: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        channels: ['sms', 'email', 'push'],
        inscriptions: ['sports', 'finance', 'movies'],
      },
      {
        name: "Diana",
        email: "diana@gmail.com",
        phone: "+55 15 99123-2222",
        device: "688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6",
        channels: ['sms', 'push'],
        inscriptions: ['finance', 'movies'],
      },
      {
        name: "Diogo",
        email: "diogol@gmail.com",
        phone: "+55 15 99123-3333",
        device: "849760fea0863a753ce531afa5196801689dd4300c46fdda2f249dc26f174158",
        channels: ['mail'],
        inscriptions: ['movies'],
      },
      {
        name: "Noah",
        email: "noah@gmail.com",
        phone: "+55 15 99123-1111",
        device: "fedf90487e6bbb8683720fdb72fa1e659595807cfcfd9a0aec0af856835370a0",
        channels: ['push'],
        inscriptions: ['finance', 'sports'],
      },
    ];
  }
}

export default MessageService;
