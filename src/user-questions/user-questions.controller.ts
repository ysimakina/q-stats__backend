import { Controller, Post, Body } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CreateUserQuestionDto } from './dto/create-user-question.dto';
import { GetMergeUserQuestionDto } from './dto/get-merge-user-question.dto';
import { OutputUserQuestionDto } from './dto/output-user-question.dto';
import { UserQuestionsService } from './user-questions.service';

@Controller('user-questions')
export class UserQuestionsController {
  constructor(private readonly userQuestionsService: UserQuestionsService) {}

  @Post('/merge-questions')
  async getMergedQuestionsByTopic(@Body() getMergeUserQuestionDto: GetMergeUserQuestionDto) {
    const questions =
      await this.userQuestionsService.getMergedQuestionsByTopic(getMergeUserQuestionDto);

    return plainToInstance(OutputUserQuestionDto, questions, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  create(@Body() createUserQuestionDto: CreateUserQuestionDto) {
    if (createUserQuestionDto.topicQuestionId) {
      return this.userQuestionsService.createDefaultQuestion(createUserQuestionDto);
    } else {
      return this.userQuestionsService.createCustomQuestion(createUserQuestionDto);
    }
  }
}
