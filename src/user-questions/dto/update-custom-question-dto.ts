import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';

import { CreateUserQuestionDto } from './create-user-question.dto';

export class UpdateCustomQuestionDto extends PartialType(CreateUserQuestionDto) {
  @IsNumber({}, { message: 'Id must be a number' })
  readonly id: number;

  @IsString({ message: 'Text must be a string' })
  readonly text: string;
}
