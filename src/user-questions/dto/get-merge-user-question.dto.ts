import { IsNumber } from 'class-validator';

export class GetMergeUserQuestionDto {
  @IsNumber({}, { message: 'UserId must be a number' })
  readonly userId: number;

  @IsNumber({}, { message: 'UserId must be a number' })
  readonly topicId: number;
}
