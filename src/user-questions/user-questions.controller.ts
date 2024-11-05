import { 
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Patch
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CreateUserQuestionDto } from './dto/create-user-question.dto';
import { OutputUserQuestionDto } from './dto/output-user-question.dto';
import { UpdateUserQuestionDto } from './dto/update-user-question.dto';
import { UserQuestionsService } from './user-questions.service';

@Controller('users/:userId/questions')
export class UserQuestionsController {
  constructor(private readonly userQuestionsService: UserQuestionsService) {}

  @Get()
  async getMergedQuestionsByTopic(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('topicId', ParseIntPipe) topicId: number,
  ): Promise<OutputUserQuestionDto[]> {
    const questions = await this.userQuestionsService.getMergedQuestionsByTopic(
      userId, topicId
    );

    return plainToInstance(OutputUserQuestionDto, questions, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  async create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createUserQuestionDto: CreateUserQuestionDto,
  ): Promise<OutputUserQuestionDto> {
    const question = await this.userQuestionsService.createCustomQuestion(
      createUserQuestionDto, userId
    );

    console.log(1111)
    return plainToInstance(OutputUserQuestionDto, question, {
      excludeExtraneousValues: true,
    });
  }
  
  @Patch()
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() { text, id, topicQuestionId }: UpdateUserQuestionDto,
  ) {
    if (topicQuestionId) {
      return this.userQuestionsService.createOrUpdateDefaultQuestion(
        { topicQuestionId, text }, userId
      );
    }

    return this.userQuestionsService.updateCustomQuestion({ id, text });
  }
}
