import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTopicQuestionDto {
  @IsString({ message: 'Text must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  readonly text: string;
}
