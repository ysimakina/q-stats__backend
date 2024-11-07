import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

import { CreateUserQuestionDto } from './create-user-question.dto';

export class UpdateCustomQuestionDto extends PartialType(CreateUserQuestionDto) {
  @IsNumber({}, { message: 'Id must be a number' })
  readonly id: number;

  @IsString({ message: 'Text must be a string' })
  @IsNotEmpty({ message: 'Text cannot be empty' })
  @MinLength(1, { message: 'Text must contain at least 1 character' })
  @MaxLength(256, { message: 'The text must contain no more than 256 characters' })
  readonly text: string;
}
