import { IUser } from '../interfaces/IUser';
import { injectable } from 'tsyringe';

@injectable()
class UsersRepository {
  private users: IUser[] = [
    {
      id: '901ac63c-7b6c-49b1-82e3-12d82e68ff7c',
      name: "Willians",
      email: "will@gmail.com",
      phone: "+55 15 99123-1232",
      device: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      channels: ['sms', 'email', 'push'],
      inscriptions: ['sports', 'finance', 'movies'],
    },
    {
      id: 'e7f26e5a-fe68-4c7e-bb70-d10a330c6950',
      name: "Diana",
      email: "diana@gmail.com",
      phone: "+55 15 99123-2222",
      device: "688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6",
      channels: ['sms', 'push'],
      inscriptions: ['finance', 'movies'],
    },
    {
      id: 'b6db08be-ccea-425a-a772-9151d4293bf2',
      name: "Diogo",
      email: "diogol@gmail.com",
      phone: "+55 15 99123-3333",
      device: "849760fea0863a753ce531afa5196801689dd4300c46fdda2f249dc26f174158",
      channels: ['mail'],
      inscriptions: ['movies'],
    },
    {
      id: '6cea852f-5a7f-4ae4-9c10-89bf9426ca33',
      name: "Noah",
      email: "noah@gmail.com",
      phone: "+55 15 99123-1111",
      device: "fedf90487e6bbb8683720fdb72fa1e659595807cfcfd9a0aec0af856835370a0",
      channels: ['push'],
      inscriptions: ['finance', 'sports'],
    },
  ];

  public async filterByCategory(categories: string[]): Promise<IUser[]> {
    return this.users.filter(
      user => user.inscriptions.some(
        inscription => categories.includes(inscription)
      )
    );
  }
}

export default UsersRepository;
