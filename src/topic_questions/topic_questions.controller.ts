import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UpdateTopicQuestionDto } from './dto/update-topic_question.dto';
import { CreateTopicQuestionDto } from './dto/create-topic_question.dto';
import { OutputGetTopicQuestionDto } from './dto/output-get-topic_question.dto';
import { OutputCreateTopicQuestionDto } from './dto/output-create-topic_question.dto';
import { TopicQuestionsService } from './topic_questions.service';

@Controller('topic-questions')
export class TopicQuestionsController {
  constructor(private readonly topicQuestionsService: TopicQuestionsService) {}

  @Get()
  async findAll(): Promise<OutputGetTopicQuestionDto[]> {
    const questions = await this.topicQuestionsService.findAll();

    return plainToInstance(OutputGetTopicQuestionDto, questions, {
      excludeExtraneousValues: true,
    });
  }

  @Get('by-topic/:id')
  async findByTopic(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OutputGetTopicQuestionDto[]> {
    const questions = await this.topicQuestionsService.findByTopic(id);

    return plainToInstance(OutputGetTopicQuestionDto, questions, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OutputGetTopicQuestionDto> {
    const question = await this.topicQuestionsService.findOne(id);

    return plainToInstance(OutputGetTopicQuestionDto, question, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  async create(
    @Body() dto: CreateTopicQuestionDto,
  ): Promise<OutputCreateTopicQuestionDto> {
    const question = await this.topicQuestionsService.create(dto);

    return plainToInstance(OutputCreateTopicQuestionDto, question, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTopicQuestionDto,
  ) {
    return this.topicQuestionsService.update(id, dto);
  }
}
