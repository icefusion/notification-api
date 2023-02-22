export default interface ILogsRepository {
  create(info: string, registerId: string): Promise<void>;
}
