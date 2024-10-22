import { Expose } from 'class-transformer';

export class OutputGetTopicDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly name: string;
}
