import { Expose, Type } from 'class-transformer';

class OutputAnswerDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly status: string;

  @Expose()
  readonly createdAt: number;
}

export class OutputCreateOrUpdateDto {
  @Type(() => OutputAnswerDto)
  @Expose()
  readonly answer: OutputAnswerDto;

  @Expose()
  readonly isCopiedQuestion: boolean;
}
