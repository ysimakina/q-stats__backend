import {
  IsOptional,
  IsNumber,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UpdateUserQuestionDto {
  @IsOptional()
  @IsNumber()
  topicQuestionId?: number;

  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString({ message: 'Text must be a string' })
  @IsNotEmpty({ message: 'Text cannot be empty' })
  @MinLength(1, { message: 'Text must contain at least 1 character' })
  @MaxLength(256, {
    message: 'The text must contain no more than 256 characters',
  })
  readonly text: string;
}
