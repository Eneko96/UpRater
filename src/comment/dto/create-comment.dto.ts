import { IsNotEmpty } from 'class-validator';

export class CreateRateDto {
  @IsNotEmpty()
  readonly content: string;
}
