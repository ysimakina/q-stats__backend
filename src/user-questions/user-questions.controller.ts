import { Controller, Post, Body, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CreateUserQuestionDto } from './dto/create-user-question.dto';
import { OutputUserQuestionDto } from './dto/output-user-question.dto';
import { UserQuestionsService } from './user-questions.service';

@Controller('users/:userId/questions')
export class UserQuestionsController {
  constructor(private readonly userQuestionsService: UserQuestionsService) {}

  @Get()
  async getMergedQuestionsByTopic(
    @Param('userId', ParseIntPipe) userId: number, 
    @Query('topicId', ParseIntPipe) topicId: number
  ): Promise<OutputUserQuestionDto[]> {
    const questions = await this.userQuestionsService.getMergedQuestionsByTopic(userId, topicId);

    return plainToInstance(OutputUserQuestionDto, questions, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createUserQuestionDto: CreateUserQuestionDto
  ) {
    if (createUserQuestionDto.topicQuestionId) {
      return this.userQuestionsService.createDefaultQuestion(createUserQuestionDto, userId);
    }

    return this.userQuestionsService.createCustomQuestion(createUserQuestionDto, userId);
  }
}
