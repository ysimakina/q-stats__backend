import { Expose } from 'class-transformer';

export class OutputUserQuestionDto {
  @Expose()
  id: number;

  @Expose()
  text: string;

  @Expose()
  order: number;
}
