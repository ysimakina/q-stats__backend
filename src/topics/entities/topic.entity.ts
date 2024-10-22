import { Column, HasMany, Model, Table } from 'sequelize-typescript';

import { TopicQuestion } from 'src/topic-questions/entities/topic-question.entity';

interface TopicCreactionAttrs {
  name: string;
}

@Table({ tableName: 'Topics', timestamps: false })
export class Topic extends Model<Topic, TopicCreactionAttrs> {
  @Column
  name: string;

  @HasMany(() => TopicQuestion)
  TopicQuestions: TopicQuestion[];
}
