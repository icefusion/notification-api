import IHashProvider from "@modules/admins/providers/HashProvider/models/IHashProvider";
import { injectable, inject } from "tsyringe";
import Admin from "../infra/typeorm/schemas/Admin";
import IAdminRepository from "../repositories/IAdminsRepository";

@injectable()
class AdminService {
  constructor(
    @inject("AdminsRepository")
    private adminsRepository: IAdminRepository,

    @inject("BCryptHashProvider")
    private bCryptHashProvider: IHashProvider
  ) {}

  public async find(): Promise<Admin[] | null> {
    return this.adminsRepository.find();
  }

  public async findByEmail(email: string): Promise<Admin | null> {
    return this.adminsRepository.findByEmail(email);
  }

  public async create() {
    const password = await this.bCryptHashProvider.generateHash("123456");

    await this.adminsRepository.create({
      name: "Administrator",
      email: "admin@gmail.com",
      password
    });
  }
}

export default AdminService;
