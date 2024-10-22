import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

import { CreateTopicDto } from './create-topic.dto';

export class UpdateTopicDto extends PartialType(CreateTopicDto) {
  @IsString({ message: 'Name must be a string' })
  readonly name: string;
}
