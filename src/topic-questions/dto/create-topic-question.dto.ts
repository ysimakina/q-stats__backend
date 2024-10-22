import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTopicQuestionDto {
  @IsString({ message: 'Text must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  readonly text: string;

  @IsNumber({}, { message: 'TopicId must be a number' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  readonly topicId: number;
}
