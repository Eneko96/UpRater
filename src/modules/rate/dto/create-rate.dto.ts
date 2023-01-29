import { IsNotEmpty } from 'class-validator';
import { Topics } from '../types';

export class CreateRateDto {
  @IsNotEmpty()
  readonly comment: string;

  @IsNotEmpty()
  readonly topics: Topics[];

  @IsNotEmpty()
  readonly created_at: Date;

  @IsNotEmpty()
  readonly anon: boolean;
}
