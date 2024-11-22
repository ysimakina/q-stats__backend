import { Expose } from 'class-transformer';

export class OutputCreateOrUpdateDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly status: string;

  @Expose()
  readonly copiedQuestion: boolean;

  @Expose()
  readonly createdAt: number;
}
