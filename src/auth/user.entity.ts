import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
}
