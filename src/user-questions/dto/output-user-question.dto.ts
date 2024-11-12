import { Expose, Type } from 'class-transformer';

import { OutputCreateOrUpdateDto } from '../../answers/dto/output-create-or-update.dto';

export class OutputUserQuestionDto {
  @Expose()
  id: number;

  @Expose()
  text: string;

  @Expose()
  order: number;

  @Expose()
  @Type(() => OutputCreateOrUpdateDto)
  answers: OutputCreateOrUpdateDto[];
}
