import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';

import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicsService {
  constructor(@InjectModel(Topic) private userRepository: typeof Topic) {}

  findAll(options: FindOptions<Topic>) {
    return this.userRepository.findAll(options);
  }

  findOne(id: number, options: FindOptions<Topic>) {
    return this.userRepository.findByPk(id, options);
  }
}
