import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicsService {
  constructor(@InjectModel(Topic) private userRepository: typeof Topic) {}

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: number) {
    return this.userRepository.findByPk(id);
  }
}
