import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

import { UserQuestion } from '../../user-questions/entities/user-question.entity';

export interface AnswerCreactionAttrs {
  status: boolean;
  userQuestionId: number;
}

@Table({ tableName: 'Answers' })
export class Answer extends Model<Answer, AnswerCreactionAttrs> {
  @Column
  status: boolean;

  @ForeignKey(() => UserQuestion)
  @Column
  userQuestionId: number;

  @BelongsTo(() => UserQuestion)
  userQuestion: UserQuestion;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
