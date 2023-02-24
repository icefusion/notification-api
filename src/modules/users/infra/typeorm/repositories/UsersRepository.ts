import { IUser } from '../interfaces/IUser';
import { injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../schemas/User';
import { ICreateUser } from '@modules/users/dtos/ICreateUser';
import { Repository, FindManyOptions } from 'typeorm';
import { MongoConnection } from '@shared/infra/typeorm/mongo';

@injectable()
class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = MongoConnection.getRepository(User);
  }

  public async filter(): Promise<User[]> {
    const users = await this.ormRepository.find();

    if (!users) {
      return [];
    }

    return users;
  }


  public async filterByCategory(categories: string[]): Promise<User[]> {
    const query = {
      where: {
        inscriptions: {
          $in: categories,
        } as any,
      },
    };

    const users = await this.ormRepository.find(query);

    if (!users) {
      return [];
    }

    return users;
  }

  public async create(data: ICreateUser): Promise<User | any> {
    const created = await this.ormRepository.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      device: data.device,
      channels: data.channels,
      inscriptions: data.inscriptions,
    });

    await this.save(created);

    return created;
  }

  public async save(user: User): Promise<void> {
    await this.ormRepository.save(user);
  }
}

export default UsersRepository;
