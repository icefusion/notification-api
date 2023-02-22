import { IAdmin } from "../infra/typeorm/interfaces/IAdmins";

export default interface IAdminRepository {
  findById(id: string): Promise<IAdmin | null>;
}
