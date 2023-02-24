import { container } from "tsyringe";

import "@modules/admins/providers";

import MessageLogsRepository from '@modules/logs/infra/typeorm/repositories/MessageLogsRepository';
import IMessageLogsRepository from '@modules/logs/infra/typeorm/interfaces/IMessageLogsRepository';
import IAdminRepository from '@modules/admins/repositories/IAdminsRepository';
import AdminsRepository from "@modules/admins/infra/typeorm/repositories/AdminsRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

container.registerSingleton<IMessageLogsRepository>(
  "MessageLogsRepository",
  MessageLogsRepository
);

container.registerSingleton<IAdminRepository>(
  "AdminRepository",
  AdminsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

