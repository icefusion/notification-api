import { IAdmin } from '../interfaces/IAdmins';
import { injectable } from 'tsyringe';

@injectable()
class AdminsRepository {
  private user: IAdmin = {
    id: '901ac63c-7b6c-49b1-82e3-12d82e68ff7c',
    name: "Willians",
    email: "will@gmail.com"
  };

  public async findById(id: string): Promise<IAdmin | null> {
    if (this.user.id !== id) {
      return null;
    }

    return this.user;
  }
}

export default AdminsRepository;
