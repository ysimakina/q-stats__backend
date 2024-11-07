import { IsBoolean, IsNumber } from "class-validator";

export class CreateAnswerDto {
  @IsBoolean({ message: 'Response must be a boolean' })
  response: boolean;

  @IsNumber({}, { message: 'UserQuestionId must be a number' })
  userQuestionId: number;
}
