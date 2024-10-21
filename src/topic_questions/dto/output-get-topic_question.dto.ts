import { Expose, Type } from 'class-transformer';

class TopicDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly name: string;
}

export class OutputGetTopicQuestionDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly text: string;

  @Expose()
  readonly order: number;

  @Type(() => TopicDto)
  @Expose()
  readonly topic: TopicDto;
}
