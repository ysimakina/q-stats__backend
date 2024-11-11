import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicsService {
  constructor(@InjectModel(Topic) private userRepository: typeof Topic) {}

  findAll(attributes: string[] = ['id', 'name'], where = {}, include = [], order = []) {
    return this.userRepository.findAll({
      attributes,
      where,
      include,
      order,
    });
  }

  findOne(id: number, attributes: string[] = ['id', 'name'], include = [], order = []) {
    return this.userRepository.findByPk(id, {
      attributes: attributes,
      include,
      order,
    });
  }
}
