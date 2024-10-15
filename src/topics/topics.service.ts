import { Injectable } from '@nestjs/common';
import { Topic } from './entities/topic.entity';
import { InjectModel } from '@nestjs/sequelize';

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
