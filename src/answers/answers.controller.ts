import { Controller, Get, Post, Body } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CreateAnswerDto } from './dto/create-answer.dto';
import { OutputCreateOrUpdateDto } from './dto/output-createOrUpdate.dto';
import { AnswersService } from './answers.service';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  async create(@Body() createAnswerDto: CreateAnswerDto) {
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
