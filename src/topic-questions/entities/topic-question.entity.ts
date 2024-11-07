import { 
  BelongsTo, 
  BelongsToMany, 
  Column, 
  ForeignKey, 
  Model, 
  Table 
} from 'sequelize-typescript';

import { UserQuestion } from '../../user-questions/entities/user-question.entity';
import { Topic } from '../../topics/entities/topic.entity';
import { User } from '../../users/entities/user.entity';

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

  @BelongsToMany(() => User, () => UserQuestion)
  users: UserQuestion[];
}
