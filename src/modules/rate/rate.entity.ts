import { User } from '../auth/user.model';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Topics, Reactions } from './types';
import { Exclude } from 'class-transformer';

@Entity()
export class Rate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comment: string;

  @ManyToOne(() => User)
  rate: User;

  @Exclude({ toPlainOnly: true })
  user: User;

  @Column()
  how_close: number;

  @Column('simple-enum', { array: true, enum: Topics })
  topics: Topics[];

  @Column()
  created_at: Date;

  @Column()
  anon: boolean;

  @Column('simple-enum', { array: true, enum: Reactions })
  reactions: Reactions[];
}
