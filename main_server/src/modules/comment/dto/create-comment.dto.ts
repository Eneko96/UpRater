import { IsNotEmpty } from 'class-validator';

export class CreateCommentDTO {
  @IsNotEmpty()
  readonly content: string;
  @IsNotEmpty()
  readonly rate_id: string;
}
