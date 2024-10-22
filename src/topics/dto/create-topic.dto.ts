import { IsString } from 'class-validator';

export class CreateTopicDto {
  @IsString({ message: 'Name must be a string' })
  readonly name: string;
}
