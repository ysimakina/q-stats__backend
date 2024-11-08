import { Expose } from 'class-transformer';

export class OutputCreateOrUpdateDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly response: string;

  @Expose()
  readonly createdAt: number;
}
