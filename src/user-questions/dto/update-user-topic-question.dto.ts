import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';

import { CreateUserQuestionDto } from './create-user-question.dto';

export class UpdateUserTopicQuestionDto extends PartialType(CreateUserQuestionDto) {
  @IsNumber({}, { message: 'TopicQuestionId must be a number' })
  readonly topicQuestionId: number;

  @IsString({ message: 'Text must be a string' })
  readonly text: string;
}
