import { IUserMessageLogDTO } from "@modules/users/dtos/IUserMessageLogDTO";

export interface IMessage {
  to: string;
  message: string;
  user: IUserMessageLogDTO;
  send(): void;
}