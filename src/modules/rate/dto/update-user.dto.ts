import { IsOptional } from 'class-validator';
import { Topics } from '../types';

export class UpdateRateDto {
  @IsOptional()
  readonly comment: string;

  @IsOptional()
  readonly topics: Topics[];

  @IsOptional()
  readonly created_at: Date;

  @IsOptional()
  readonly anon: boolean;
}
