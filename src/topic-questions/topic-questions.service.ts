import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Topic } from 'src/topics/entities/topic.entity';
import { TopicQuestion } from './entities/topic-question.entity';
import { CreateTopicQuestionDto } from './dto/create-topic-question.dto';
import { UpdateTopicQuestionDto } from './dto/update-topic-question.dto';

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
      attributes: { 
        include: ['id', 'text', 'order'], 
      },
      order: [['order', 'ASC']],
    });
  }

  async findOne(id: number) {
    const question = await this.topicQuestionRepository.findByPk(id, {
      attributes: { exclude: ['topicId'] },
      include: [
        {
          model: Topic,
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return question;
  }

  async create(dto: CreateTopicQuestionDto) {
    const { topicId } = dto;

    const topicQuestions = await this.findByTopic(topicId);

    const order = topicQuestions.length + 1;

    const question = await this.topicQuestionRepository.create({
      ...dto,
      order: order,
    });

    return question;
  }

  async update(id: number, dto: UpdateTopicQuestionDto) {
    const question = await this.topicQuestionRepository.findByPk(id);

    if (!question) {
      throw new NotFoundException(`Question with ID topic ${id} not found`);
    }

    question.update(dto);
  }
}
