import { Controller, Get, Post, Body, Query, ParseIntPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UserQuestionsService } from '../user-questions/user-questions.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { OutputCreateOrUpdateDto } from './dto/output-create-or-update.dto';
import { AnswersService } from './answers.service';

@Controller('answers')
export class AnswersController {
  constructor(
    private readonly answersService: AnswersService,
    private readonly userQuestionsService: UserQuestionsService,
  ) {}

  @Post()
  async createOrUpdate(
    @Body() createAnswerDto: CreateAnswerDto,
    @Query('userId', ParseIntPipe) userId: number,
    @Query('topicId', ParseIntPipe) topicId: number,
  ) {
    await this.userQuestionsService.copyQuestions(topicId, userId);

    const answer = await this.answersService.createOrUpdate(createAnswerDto);

    return plainToInstance(OutputCreateOrUpdateDto, answer, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async findAll() {
    const answers = await this.answersService.findAll();

    return plainToInstance(OutputCreateOrUpdateDto, answers, {
      excludeExtraneousValues: true,
    });
  }
}
