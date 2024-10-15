import { Column, Model, Table } from 'sequelize-typescript';

interface TopicCreactionAttrs {
  name: string;
}

@Table({ tableName: 'Topics', timestamps: false })
export class Topic extends Model<Topic, TopicCreactionAttrs> {
  @Column
  name: string;
}
