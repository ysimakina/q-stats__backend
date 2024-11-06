import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Topic } from '../topics/entities/topic.entity';
import { TopicQuestion } from './entities/topic-question.entity';
import { CreateTopicQuestionDto } from './dto/create-topic-question.dto';
import { UpdateTopicQuestionDto } from './dto/update-topic-question.dto';

@Injectable()
export class TopicQuestionsService {
  constructor(
    @InjectModel(TopicQuestion)
    private topicQuestionRepository: typeof TopicQuestion,
  ) {}

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
    try {
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
    } catch (error) {
      throw new BadRequestException('Failed to get question');
    }
  }

  async create(dto: CreateTopicQuestionDto, topicId) {
    try {
      const topicQuestions = await this.findByTopic(topicId);

      const order = topicQuestions.length + 1;

      const question = await this.topicQuestionRepository.create({
        ...dto,
        topicId,
        order,
      });

      return question;
    } catch (error) {
      throw new BadRequestException('Failed to create question');
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
      throw new BadRequestException('Failed to update question');
    }
  }
}
