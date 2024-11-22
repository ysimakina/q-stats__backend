import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber } from 'class-validator';

export class CreateAnswerDto {
  @IsBoolean({ message: 'Status must be a boolean' })
  status: boolean;

  @IsNumber({}, { message: 'UserQuestionId must be a number' })
  userQuestionId: number;

  @Type(() => Date)
  @IsDate({ message: 'Date must be a type Date' })
  date: Date;
}
