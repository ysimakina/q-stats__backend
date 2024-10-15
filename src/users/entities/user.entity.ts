import { Column, Model, Table } from 'sequelize-typescript';

interface UserCreactionAttrs {
  name: string;
}

@Table({ tableName: 'Users', timestamps: false })
export class User extends Model<User, UserCreactionAttrs> {
  @Column
  name: string;
}
