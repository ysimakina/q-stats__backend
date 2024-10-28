import { Expose } from 'class-transformer';

export class OutputGetTopicQuestionDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly text: string;

  @Expose()
  readonly order: number;
}
