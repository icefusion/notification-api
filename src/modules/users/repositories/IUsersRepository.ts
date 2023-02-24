import User from '../infra/typeorm/schemas/User';
import { ICreateUser } from '@modules/users/dtos/ICreateUser';

export default interface IUsersRepository {
  filter(): Promise<User[]>;
  filterByCategory(categories: string[]): Promise<User[]>;
  create(data: ICreateUser): Promise<User | any>;
  save(user: User): Promise<void>;
}
