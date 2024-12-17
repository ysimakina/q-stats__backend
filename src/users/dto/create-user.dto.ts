import { Type } from 'class-transformer';
import { IsString, Length, ValidateNested } from 'class-validator';

import { TopicQuestion } from '../../topic-questions/entities/topic-question.entity';

export class CreateUserDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @ValidateNested({ each: true })
  @Type(() => TopicQuestion)
  topicQuestions: TopicQuestion[];
}
