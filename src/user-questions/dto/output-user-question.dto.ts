import { Expose, Type } from 'class-transformer';

import { OutputCreateOrUpdateDto } from 'src/answers/dto/output-createOrUpdate.dto';

export class OutputUserQuestionDto {
  @Expose()
  id: number;

  @Expose()
  text: string;

  @Expose()
  order: number;

  @Expose()
  @Type(() => OutputCreateOrUpdateDto)
  answers: OutputCreateOrUpdateDto[]
}
