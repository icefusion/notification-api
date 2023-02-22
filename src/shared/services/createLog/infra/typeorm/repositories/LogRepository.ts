import { MongoRepository, Repository } from "typeorm";

import { MongoConnection } from "@shared/infra/typeorm/mongo";
import ILogsRepository from "@shared/services/logs/repositories/ILogsRepository";

import Log from "../schemas/Log";
class LogsRepository implements ILogsRepository {
  private ormRepository: Repository<Log>;

  constructor() {
    this.ormRepository = MongoConnection.getRepository(Log);
  }

  public async findAll(): Promise<Log[] | null> {
    const logs = await this.ormRepository.find();

    return logs;
  }

  public async create(info: string, registerId: string): Promise<void> {
    const log = this.ormRepository.create({ info, registerId });

    await this.ormRepository.save(log);
  }
}

export default LogsRepository;
