import { IsNotEmpty } from 'class-validator';

export class CreateReactionDto {
  @IsNotEmpty()
  readonly reaction: string;
}
