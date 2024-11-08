import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber } from 'class-validator';

export class CreateAnswerDto {
  @IsBoolean({ message: 'Response must be a boolean' })
  response: boolean;

  @IsNumber({}, { message: 'UserQuestionId must be a number' })
  userQuestionId: number;

  @Type(() => Date)
  @IsDate({ message: 'Date must be a type Date' })
  date: Date;
}
