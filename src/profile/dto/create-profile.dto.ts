import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
