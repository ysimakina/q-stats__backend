import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ParseIntPipe,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { AnswersService } from './answers.service';
import { UserQuestionsService } from '../user-questions/user-questions.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { OutputCreateOrUpdateDto } from './dto/output-create-or-update.dto';

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
    const { userQuestionId } = createAnswerDto;

    const verifyUserQuestionExists = await this.userQuestionsService.verifyUserQuestionExists({
      where: { id: userQuestionId },
      attributes: ['id'],
    });

    if (!verifyUserQuestionExists) {
      const copiedQuestions = await this.userQuestionsService.copyQuestions(topicId, userId);

      const questionMapping = new Map(
        copiedQuestions.map((question) => [question.topicQuestionId, question.id]),
      );

      const correctUserQuestionId = questionMapping.get(createAnswerDto.userQuestionId);

      if (!correctUserQuestionId) {
        throw new BadRequestException('Invalid userQuestionId');
      }

      const answer = await this.answersService.createOrUpdate({
        ...createAnswerDto,
        userQuestionId: correctUserQuestionId,
      });

      return plainToInstance(
        OutputCreateOrUpdateDto,
        { answer, isCopiedQuestion: true },
        {
          excludeExtraneousValues: true,
        },
      );
    }
    const answer = await this.answersService.createOrUpdate(createAnswerDto);

    return plainToInstance(
      OutputCreateOrUpdateDto,
      { answer, isCopiedQuestion: false },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  @Get()
  async findAll() {
    const answers = await this.answersService.findAll({
      attributes: ['id', 'userQuestionId', 'status', 'createdAt'],
      order: [['id', 'ASC']],
    });

    return plainToInstance(OutputCreateOrUpdateDto, answers, {
      excludeExtraneousValues: true,
    });
  }

  @Get('/user/:userId/topic/:topicId')
  formatedAnswersOnDate(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('topicId', ParseIntPipe) topicId: number,
  ) {
    return this.answersService.formatedAnswersOnDate(userId, topicId);
  }
}
