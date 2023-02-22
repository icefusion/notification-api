import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IUpdateUserDTO from "../dtos/IUpdateUserDTO";
import User from "../infra/typeorm/entities/User";

export default interface IUsersRepository {
  list(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  update(id: string, data: IUpdateUserDTO): Promise<User | null>;
  delete(id: string): Promise<User | null>;
}
