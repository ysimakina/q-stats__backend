import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { TopicQuestionsService } from './topic_questions.service';
import { UpdateTopicQuestionDto } from './dto/update-topic_question.dto';
import { CreateTopicQuestionDto } from './dto/create-topic_question.dto';

@Controller('topic-questions')
export class TopicQuestionsController {
  constructor(private readonly topicQuestionsService: TopicQuestionsService) {}

  @Get()
  findAll() {
    return this.topicQuestionsService.findAll();
  }

  @Get('by-topic/:id')
  findByTopic(@Param('id', ParseIntPipe) id: number) {
    return this.topicQuestionsService.findByTopic(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.topicQuestionsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTopicQuestionDto) {
    return this.topicQuestionsService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTopicQuestionDto,
  ) {
    return this.topicQuestionsService.update(id, dto);
  }
}
