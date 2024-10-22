import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Topic } from 'src/topics/entities/topic.entity';

@Table({ tableName: 'TopicQuestion', timestamps: false })
export class TopicQuestion extends Model {
  @Column
  text: string;

  @Column
  order: number;

  @ForeignKey(() => Topic)
  topicId: number;

  @BelongsTo(() => Topic)
  topic: Topic;
}
