import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { CreateTopicQuestionDto } from './create-topic-question.dto';

export class UpdateTopicQuestionDto extends PartialType(
  CreateTopicQuestionDto,
) {
  @IsString({ message: 'Text must be a string' })
  @IsNotEmpty({ message: 'Text cannot be empty' })
  @MinLength(1, { message: 'Text must contain at least 1 character' })
  @MaxLength(256, {
    message: 'The text must contain no more than 256 characters',
  })
  readonly text: string;
}
