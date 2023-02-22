import { container } from "tsyringe";

import "@modules/users/providers";

import MessageLogsRepository from '@modules/logs/infra/typeorm/repositories/MessageLogsRepository';
import IMessageLogsRepository from '@modules/logs/infra/typeorm/interfaces/IMessageLogsRepository';

container.registerSingleton<IMessageLogsRepository>(
  "MessageLogsRepository",
  MessageLogsRepository
);
