import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';

import { CreateTopicQuestionDto } from './dto/create-topic-question.dto';
import { UpdateTopicQuestionDto } from './dto/update-topic-question.dto';
import { TopicQuestion } from './entities/topic-question.entity';

@Injectable()
export class TopicQuestionsService {
  constructor(
    @InjectModel(TopicQuestion)
    private topicQuestionRepository: typeof TopicQuestion,
  ) {}

  findAll(options: FindOptions<TopicQuestion>) {
    return this.topicQuestionRepository.findAll(options);
  }

  async findOne(id: number, options: FindOptions<TopicQuestion>) {
    try {
      const question = await this.topicQuestionRepository.findByPk(id, options);

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
      const topicQuestions = await this.findAll({
        where: { topicId },
        attributes: ['id', 'text', 'order'],
        order: [['order', 'ASC']],
      });

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

  async delete(options: FindOptions<TopicQuestion>) {
    try {
      return await this.topicQuestionRepository.destroy(options);
    } catch (error) {
      throw new BadRequestException('Failed to delete question', error.message);
    }
  }
}
