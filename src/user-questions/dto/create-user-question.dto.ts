import { IsNumber, IsString } from 'class-validator';

export class CreateUserQuestionDto {
  @IsNumber({}, { message: 'TopicQuestionId must be a number' })
  readonly topicQuestionId?: number;

  @IsNumber({}, { message: 'UserId must be a number' })
  readonly topicId?: number;

  @IsString({ message: 'Text must be a string' })
  readonly text: string;
}
