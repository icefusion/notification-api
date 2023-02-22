export default interface ICreateUserTokenDTO {
  userId: string;
  token: string;
  expiresAt: Date;
}
