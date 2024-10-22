import { Expose } from 'class-transformer';

export class OutputCreateTopicQuestionDto {
  @Expose()
  readonly id: number;
}
