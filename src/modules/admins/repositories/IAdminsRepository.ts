import { ICreateAdminDto } from "../dtos/ICreateAdminDto";
import Admin from "../infra/typeorm/schemas/Admin";

export default interface IAdminRepository {
  existAdminUser(): Promise<Admin[]>;
  findByEmail(email: string): Promise<Admin | null>;
  find(): Promise<Admin[] | null>;
  create(data: ICreateAdminDto): Promise<Admin | null>;
}
