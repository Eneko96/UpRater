import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min, Max } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(150)
  @Type(() => Number)
  readonly age: number;
}
