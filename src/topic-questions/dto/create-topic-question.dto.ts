import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTopicQuestionDto {
  @IsString({ message: 'Text must be a string' })
  @IsNotEmpty({ message: 'Text cannot be empty' })
  @MinLength(1, { message: 'Text must contain at least 1 character' })
  readonly text: string;
}
