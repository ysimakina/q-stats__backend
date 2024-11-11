import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  findAll(attributes: string[] = ['id', 'name'], where = {}, include = [], order = []) {
    return this.userRepository.findAll({
      attributes,
      where,
      include,
      order,
    });
  }

  findOne(id: number, attributes: string[] = ['id', 'name'], include = []) {
    return this.userRepository.findByPk(id, {
      attributes,
      include,
    });
  }
}
