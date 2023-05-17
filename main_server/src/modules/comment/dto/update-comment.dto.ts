import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateCommentDTO {
  @IsString()
  @IsOptional()
  readonly content: string;
}
