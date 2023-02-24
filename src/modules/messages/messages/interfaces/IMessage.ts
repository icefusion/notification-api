import { IUserMessageLogDTO } from "@modules/auth/dtos/IUserMessageLogDTO";

export interface IMessage {
  to: string;
  message: string;
  user: IUserMessageLogDTO;
  send(): void;
}
