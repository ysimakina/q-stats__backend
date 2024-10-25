import { 
  BelongsTo, 
  BelongsToMany, 
  Column, 
  ForeignKey, 
  Model, 
  Table 
} from 'sequelize-typescript';
import { Topic } from 'src/topics/entities/topic.entity';
import { UserQuestion } from 'src/user-questions/entities/user-question.entity';
import { User } from 'src/users/entities/user.entity';

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
