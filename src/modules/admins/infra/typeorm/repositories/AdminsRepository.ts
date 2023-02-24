import { injectable } from 'tsyringe';
import { ICreateAdminDto } from '@modules/admins/dtos/ICreateAdminDto';
import IAdminRepository from '@modules/admins/repositories/IAdminsRepository';
import { Repository } from 'typeorm';
import Admin from '../schemas/Admin';
import { MongoConnection } from '@shared/infra/typeorm/mongo';

@injectable()
class AdminsRepository implements IAdminRepository {
  private ormRepository: Repository<Admin>;

  constructor() {
    this.ormRepository = MongoConnection.getRepository(Admin);
  }

  public async existAdminUser(): Promise<Admin[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async find(): Promise<Admin[] | null> {
    try {
      const users = await this.ormRepository.find();

      console.log("USERS ", users);

      return users;
    } catch (err: any) {
      console.log("ERROR ", err.message);
      return null;
    }
  }

  public async findByEmail(email: string): Promise<Admin | null> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async create(data: ICreateAdminDto): Promise<Admin | null> {
    const created = await this.ormRepository.create({
      name: data.name,
      email: data.email,
      password: data.password
    });

    await this.save(created);

    return created;
  }

  public async save(admin: Admin): Promise<void> {
    await this.ormRepository.save(admin);
  }
}

export default AdminsRepository;
