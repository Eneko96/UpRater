// import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @OneToOne((type) => User, (user) => user.profile, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
