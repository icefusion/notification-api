
import { Email } from './Email';
import { Message } from './Message';
import { PushNotification } from './PushNotification';
import { Sms } from './Sms';
import AppError from '../../../shared/errors/AppError';
import { IMessageRequest } from './interfaces/IMessageRequest';
import { ChannelEnum } from '../enums/ChannelEnum';

export class MessageFactory {
  createMessage(data: IMessageRequest): Message {
    switch (data.type) {
      case ChannelEnum.email:
        return new Email(data.from ?? '', data.to, data.subject ?? '', data.message, data.user);
      case ChannelEnum.push:
        return new PushNotification(data.to, data.message, data.user);
      case ChannelEnum.sms:
        return new Sms(data.from ?? '', data.to, data.message, data.user);
      default:
        throw new AppError('Invalid Message Type.');
    }
  }
}