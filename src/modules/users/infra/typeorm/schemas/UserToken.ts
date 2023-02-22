import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID,
  CreateDateColumn,
} from 'typeorm';

@Entity('user_tokens')
class UserToken {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  token: string;

  @Column()
  user_id: string;

  @Column()
  expires_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

export default UserToken;
