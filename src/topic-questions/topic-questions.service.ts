import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindAttributeOptions, IncludeOptions, Order, WhereOptions } from 'sequelize';

import { CreateTopicQuestionDto } from './dto/create-topic-question.dto';
import { UpdateTopicQuestionDto } from './dto/update-topic-question.dto';
import { TopicQuestion } from './entities/topic-question.entity';
import { Topic } from '../topics/entities/topic.entity';

@Injectable()
export class TopicQuestionsService {
  constructor(
    @InjectModel(TopicQuestion)
    private topicQuestionRepository: typeof TopicQuestion,
  ) {}

  findByTopic(
    where: WhereOptions = {},
    attributes: FindAttributeOptions = ['id', 'text', 'order'],
    order: Order = [['order', 'ASC']],
  ) {
    return this.topicQuestionRepository.findAll({
      where,
      attributes,
      order,
    });
  }

  async findOne(
    id: number,
    attributes: FindAttributeOptions = { exclude: ['topicId'] },
    include: IncludeOptions[] = [
      {
        model: Topic,
        attributes: ['id', 'name'],
      },
    ],
    order: Order = [],
  ) {
    try {
      const question = await this.topicQuestionRepository.findByPk(id, {
        attributes,
        include,
        order,
      });

      if (!question) {
        throw new NotFoundException(`Question with ID ${id} not found`);
      }

      return question;
    } catch (error) {
      throw new BadRequestException('Failed to get question', error.message);
    }
  }

  async create(dto: CreateTopicQuestionDto, topicId) {
    try {
      const topicQuestions = await this.findByTopic({ topicId });

      const order = topicQuestions.length + 1;

      const question = await this.topicQuestionRepository.create({
        ...dto,
        topicId,
        order,
      });

      return question;
    } catch (error) {
      throw new BadRequestException('Failed to create question', error.message);
    }
  }

  async update(id: number, dto: UpdateTopicQuestionDto) {
    try {
      const question = await this.topicQuestionRepository.findByPk(id);

      if (!question) {
        throw new NotFoundException(`Question with ID topic ${id} not found`);
      }

      question.update({ ...dto });
    } catch (error) {
      throw new BadRequestException('Failed to update question', error.message);
    }
  }
}
