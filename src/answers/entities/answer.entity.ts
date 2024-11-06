import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript';

import { UserQuestion } from '../../user-questions/entities/user-question.entity';

interface AnswerCreactionAttrs {
  response: boolean;
  userQuestionId: number;
  date: string;
}

@Table({ tableName: 'Answers', timestamps: false })
export class Answer extends Model<Answer, AnswerCreactionAttrs> {
  @Column
  response: boolean;

  @Column
  date: string;

  @ForeignKey(() => UserQuestion)
  @Column
  userQuestionId: number;

  @BelongsTo(() => UserQuestion)
  userQuestion: UserQuestion;
}
