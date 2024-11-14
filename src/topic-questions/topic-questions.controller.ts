import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CreateTopicQuestionDto } from './dto/create-topic-question.dto';
import { OutputCreateTopicQuestionDto } from './dto/output-create-topic-question.dto';
import { OutputGetTopicQuestionDto } from './dto/output-get-topic-question.dto';
import { UpdateTopicQuestionDto } from './dto/update-topic-question.dto';
import { TopicQuestionsService } from './topic-questions.service';
import { Topic } from '../topics/entities/topic.entity';

@Controller('topic/:id/questions')
export class TopicQuestionsController {
  constructor(private readonly topicQuestionsService: TopicQuestionsService) {}

  @Get()
  async findAll(@Param('id', ParseIntPipe) topicId: number): Promise<OutputGetTopicQuestionDto[]> {
    const questions = await this.topicQuestionsService.findAll({
      where: { topicId },
      attributes: ['id', 'text', 'order'],
      order: [['order', 'ASC']],
    });

    return plainToInstance(OutputGetTopicQuestionDto, questions, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':questionId')
  async findOne(
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<OutputGetTopicQuestionDto> {
    const question = await this.topicQuestionsService.findOne(questionId, {
      attributes: { exclude: ['topicId'] },
      include: [
        {
          model: Topic,
          attributes: ['id', 'name'],
        },
      ],
    });

    return plainToInstance(OutputGetTopicQuestionDto, question, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  async create(
    @Param('id', ParseIntPipe) topicId: number,
    @Body() dto: CreateTopicQuestionDto,
  ): Promise<OutputCreateTopicQuestionDto> {
    const question = await this.topicQuestionsService.create(dto, topicId);

    return plainToInstance(OutputCreateTopicQuestionDto, question, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':questionId')
  update(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body() dto: UpdateTopicQuestionDto,
  ) {
    return this.topicQuestionsService.update(questionId, dto);
  }

  @Delete(':questionId')
  delete(@Param('questionId', ParseIntPipe) questionId: number) {
    return this.topicQuestionsService.delete({ where: { id: questionId } });
  }
}
