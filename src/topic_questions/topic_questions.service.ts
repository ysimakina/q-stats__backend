import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { TopicQuestion } from './entities/topic_question.entity';
import { Topic } from 'src/topics/entities/topic.entity';
import { CreateTopicQuestionDto } from './dto/create-topic_question.dto';
import { UpdateTopicQuestionDto } from './dto/update-topic_question.dto';

@Injectable()
export class TopicQuestionsService {
  constructor(
    @InjectModel(TopicQuestion)
    private topicQuestionRepository: typeof TopicQuestion,
  ) {}

  findAll() {
    return this.topicQuestionRepository.findAll({
      attributes: { exclude: ['topicId'] },
      include: [
        {
          model: Topic,
          attributes: ['id', 'name'],
        },
      ],
    });
  }

  findByTopic(topicId: number) {
    return this.topicQuestionRepository.findAll({
      where: { topicId },
      attributes: { exclude: ['topicId'] },
      include: [
        {
          model: Topic,
          attributes: ['id', 'name'],
        },
      ],
    });
  }

  async findOne(id: number) {
    const question = await this.topicQuestionRepository.findByPk(id);

    if (!question) throw new NotFoundException(`Question with ID ${id} not found`);

    return question;
  }

  async create(dto: CreateTopicQuestionDto) {
    const { topicId } = dto;
    const order = await this.topicQuestionRepository.findAll({
      where: {
        topicId,
      },
    });

    const newOrder = order.length + 1;

    return this.topicQuestionRepository.create({ ...dto, order: newOrder });
  }

  async update(id: number, dto: UpdateTopicQuestionDto) {
    const question = await this.topicQuestionRepository.findByPk(id);

    if (!question) throw new NotFoundException(`Question with ID topic ${id} not found`);

    return question.update(dto);
  }
}
