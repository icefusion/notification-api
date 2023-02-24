import { IUserMessageLogDTO } from '@modules/auth/dtos/IUserMessageLogDTO';

export interface IMessageRequest {
  type: string;
  from?: string;
  to: string;
  subject?: string;
  message: string;
  user: IUserMessageLogDTO;
}
