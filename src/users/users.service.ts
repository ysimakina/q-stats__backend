import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindAttributeOptions, IncludeOptions, Order, WhereOptions } from 'sequelize';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  findAll(
    attributes: FindAttributeOptions = ['id', 'name'],
    where: WhereOptions = {},
    include: IncludeOptions[] = [],
    order: Order = [],
  ) {
    return this.userRepository.findAll({
      attributes,
      where,
      include,
      order,
    });
  }

  findOne(
    id: number,
    attributes: FindAttributeOptions = ['id', 'name'],
    include: IncludeOptions[] = [],
  ) {
    return this.userRepository.findByPk(id, {
      attributes,
      include,
    });
  }
}
