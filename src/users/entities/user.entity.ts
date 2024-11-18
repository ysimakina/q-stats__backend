import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';

import { TopicQuestion } from '../../topic-questions/entities/topic-question.entity';
import { UserQuestion } from '../../user-questions/entities/user-question.entity';

interface UserCreactionAttrs {
  name: string;
}

@Table({ tableName: 'Users', timestamps: false })
export class User extends Model<User, UserCreactionAttrs> {
  @Column
  name: string;

  @BelongsToMany(() => TopicQuestion, () => UserQuestion)
  topicQuestios: TopicQuestion[];
}
