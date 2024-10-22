import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { plainToInstance } from 'class-transformer';

import { Topic } from './entities/topic.entity';
import { OutputGetTopicDto } from './dto/output-get-topic.dto';

@Injectable()
export class TopicsService {
  constructor(@InjectModel(Topic) private userRepository: typeof Topic) {}

  async findAll(): Promise<OutputGetTopicDto[]> {
    const topics = await this.userRepository.findAll({
      attributes: ['id', 'name'],
    });

    return plainToInstance(OutputGetTopicDto, topics, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: number): Promise<OutputGetTopicDto> {
    const topic = await this.userRepository.findByPk(id, {
      attributes: ['id', 'name'],
    });

    return plainToInstance(OutputGetTopicDto, topic, {
      excludeExtraneousValues: true,
    });
  }
}
