import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  device: string;

  @Column()
  channels: string[];

  @Column()
  inscriptions: string[];

  @Column()
  expires_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

export default User;
