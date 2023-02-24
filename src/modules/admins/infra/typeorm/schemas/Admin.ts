import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID,
  CreateDateColumn,
} from 'typeorm';

@Entity('admins')
class Admin {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  expires_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

export default Admin;
