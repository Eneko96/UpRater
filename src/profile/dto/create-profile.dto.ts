import { IsNotEmpty, IsString } from 'class-validator';

export class AddToProfileDto {
  @IsNotEmpty()
  @IsString()
  city?: string;
}
