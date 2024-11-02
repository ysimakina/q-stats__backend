import { Expose } from 'class-transformer';

export class OutputCreateTopicQuestionDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly text: string;

  @Expose()
  readonly order: number;
}
