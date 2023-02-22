import { injectable, inject } from "tsyringe";

import IAdminRepository from "../repositories/IAdminsRepository";
import { IAdmin } from "../infra/typeorm/interfaces/IAdmins";

interface IRequest {
  name: string;
  email: string;
  password: string;
  role_id: string;
}

@injectable()
class AdminService {
  constructor(
    @inject("AdminsRepository")
    private adminsRepository: IAdminRepository
  ) {}

  public async findById(id: string): Promise<IAdmin | null> {
    return this.adminsRepository.findById(id);
  }
}

export default AdminService;
