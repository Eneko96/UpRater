import { IsNotEmpty } from 'class-validator';
import { Reactions, Topics } from '../types';

export class CreateRateDto {
  @IsNotEmpty()
  readonly comment: string;

  @IsNotEmpty()
  readonly how_close: number;

  @IsNotEmpty()
  readonly topics: Topics[];

  @IsNotEmpty()
  readonly created_at: Date;

  @IsNotEmpty()
  readonly anon: boolean;

  @IsNotEmpty()
  readonly reactions: Reactions[];
}
