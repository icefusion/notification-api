import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ObjectIdColumn,
} from "typeorm";

@Entity("logs")
class Log {
  @ObjectIdColumn()
  id: string;

  @Column()
  registerId: string;

  @Column()
  info: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Log;
