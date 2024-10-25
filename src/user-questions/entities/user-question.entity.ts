import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { TopicQuestion } from 'src/topic-questions/entities/topic-question.entity';
import { Topic } from 'src/topics/entities/topic.entity';

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
}
