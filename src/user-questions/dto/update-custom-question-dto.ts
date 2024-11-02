import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

import { CreateUserQuestionDto } from './create-user-question.dto';

export class UpdateCustomQuestionDto extends PartialType(CreateUserQuestionDto) {
  @IsNumber({}, { message: 'Id must be a number' })
  readonly id: number;

  @IsString({ message: 'Text must be a string' })
  @IsNotEmpty({ message: 'Text cannot be empty' })
  @MinLength(1, { message: 'Text must contain at least 1 character' })
  readonly text: string;
}
