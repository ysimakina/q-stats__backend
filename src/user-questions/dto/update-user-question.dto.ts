import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateUserQuestionDto {
  @IsOptional()
  @IsNumber()
  topicQuestionId?: number;

  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  text: string;
}
