import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { UpdateUserTopicQuestionDto } from './update-user-topic-question.dto';
import { UpdateCustomQuestionDto } from './update-custom-question-dto';

export class UpdateUserQuestionDto {
  @IsOptional()
  @Type(() => UpdateUserTopicQuestionDto)
  updateUserTopicQuestionDto?: UpdateUserTopicQuestionDto;

  @IsOptional()
  @Type(() => UpdateCustomQuestionDto)
  updateCustomQuestionDto?: UpdateCustomQuestionDto;
}
