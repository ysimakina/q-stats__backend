import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

import { CreateTopicQuestionDto } from './create-topic-question.dto';

export class UpdateTopicQuestionDto extends PartialType(
  CreateTopicQuestionDto,
) {
  @IsString({ message: 'Text must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  readonly text: string;
}
