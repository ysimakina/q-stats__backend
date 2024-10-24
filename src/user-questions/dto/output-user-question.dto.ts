import { Expose } from 'class-transformer';

export class OutputUserQuestionDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly text: string;

  @Expose()
  readonly order: number;
}
