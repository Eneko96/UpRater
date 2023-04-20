import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(150)
  @Type(() => Number)
  readonly age: number;
}
