import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { User } from '../../users/entities/user.entity';
import { TopicQuestion } from '../../topic-questions/entities/topic-question.entity';
import { Topic } from '../../topics/entities/topic.entity';
import { Answer } from '../../answers/entities/answer.entity';

@Table({ tableName: 'UserQuestions', timestamps: false, underscored: true })
export class UserQuestion extends Model<UserQuestion> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => TopicQuestion)
  @Column
  topicQuestionId?: number;

  @ForeignKey(() => Topic)
  topicId: number;

  @BelongsTo(() => Topic)
  topic: Topic;

  @Column
  text: string;

  @Column
  order: number;

  @BelongsTo(() => TopicQuestion)
  topicQuestion: TopicQuestion;

  @HasMany(() => Answer)
  answers: Answer[];
}
