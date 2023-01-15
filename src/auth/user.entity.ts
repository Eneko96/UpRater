import { Profile } from 'src/profile/profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rate } from '../rate/rate.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Rate, (rate) => rate.user, { eager: true })
  rates: Rate[];

  @OneToOne((type) => Profile, (profile) => profile.user)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
