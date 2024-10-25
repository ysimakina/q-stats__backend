import { IsNumber, IsString } from 'class-validator';

export class CreateUserQuestionDto {
  @IsNumber({}, { message: 'TopicId must be a number' })
  readonly topicId: number;

  @IsString({ message: 'Text must be a string' })
  readonly text: string;
}
