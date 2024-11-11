import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindAttributeOptions, IncludeOptions, Order, WhereOptions } from 'sequelize';

import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicsService {
  constructor(@InjectModel(Topic) private userRepository: typeof Topic) {}

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
    order: Order = [],
  ) {
    return this.userRepository.findByPk(id, {
      attributes: attributes,
      include,
      order,
    });
  }
}
