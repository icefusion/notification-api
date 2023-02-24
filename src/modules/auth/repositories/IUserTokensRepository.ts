import ICreateUserTokenDTO from "../dtos/ICreateUserTokenDTO";

export default interface IUserTokensRepository {
  generate(data: ICreateUserTokenDTO): Promise<any>;
  deleteAllByUser(userId: string): Promise<boolean>;
  findByToken(token: string): Promise<any | null>;
}
