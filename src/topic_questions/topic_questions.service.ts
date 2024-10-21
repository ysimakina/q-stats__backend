import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { plainToInstance } from 'class-transformer';

import { TopicQuestion } from './entities/topic_question.entity';
import { Topic } from 'src/topics/entities/topic.entity';
import { CreateTopicQuestionDto } from './dto/create-topic_question.dto';
import { UpdateTopicQuestionDto } from './dto/update-topic_question.dto';
import { OutputGetTopicQuestionDto } from './dto/output-get-topic_question.dto';
import { OutputCreateTopicQuestionDto } from './dto/output-create-topic_question.dto';

@Injectable()
export class TopicQuestionsService {
  constructor(
    @InjectModel(TopicQuestion)
    private topicQuestionRepository: typeof TopicQuestion,
  ) {}

  async findAll(): Promise<OutputGetTopicQuestionDto[]> {
    const questions = await this.topicQuestionRepository.findAll({
      attributes: { exclude: ['topicId'] },
      include: [
        {
          model: Topic,
          attributes: ['id', 'name'],
        },
      ],
    });

    return plainToInstance(OutputGetTopicQuestionDto, questions, {
      excludeExtraneousValues: true,
    });
  }

  async findByTopic(topicId: number): Promise<OutputGetTopicQuestionDto[]> {
    const questions = await this.topicQuestionRepository.findAll({
      where: { topicId },
      attributes: { exclude: ['topicId'] },
      include: [
        {
          model: Topic,
          attributes: ['id', 'name'],
        },
      ],
    });

    return plainToInstance(OutputGetTopicQuestionDto, questions, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: number): Promise<OutputGetTopicQuestionDto> {
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

    return plainToInstance(OutputGetTopicQuestionDto, question, {
      excludeExtraneousValues: true,
    });
  }

  async create(
    dto: CreateTopicQuestionDto,
  ): Promise<OutputCreateTopicQuestionDto> {
    const { topicId } = dto;

    const topicQuestions = await this.findByTopic(topicId);

    const order = topicQuestions.length + 1;

    const question = await this.topicQuestionRepository.create({
      ...dto,
      order: order,
    });

    return plainToInstance(OutputCreateTopicQuestionDto, question, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: number, dto: UpdateTopicQuestionDto) {
    const question = await this.topicQuestionRepository.findByPk(id);

    if (!question) {
      throw new NotFoundException(`Question with ID topic ${id} not found`);
    }

    question.update(dto);
  }
}
