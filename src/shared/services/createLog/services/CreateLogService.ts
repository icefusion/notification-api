import { injectable, inject } from "tsyringe";

import ILogsRepository from "../repositories/ILogsRepository";

@injectable()
class CreateLogService {
  constructor(
    @inject("LogsRepository")
    private logsRepository: ILogsRepository
  ) {}

  public async create(info: string, registerId: string): Promise<void> {
    console.log("test2");
    await this.logsRepository.create(info, registerId);
  }
}

export default CreateLogService;
