import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, Op } from 'sequelize';

import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answer } from './entities/answer.entity';
import { UserQuestion } from '../user-questions/entities/user-question.entity';

@Injectable()
export class AnswersService {
  constructor(@InjectModel(Answer) private answerRepository: typeof Answer) {}

  async createOrUpdate(createAnswerDto: CreateAnswerDto) {
    try {
      const startDate = createAnswerDto.date.setHours(0, 0, 0, 0);
      const endDate = createAnswerDto.date.setHours(23, 59, 59, 999);

      const existingAnswer = await this.answerRepository.findOne({
        attributes: ['id', 'userQuestionId', 'response', 'createdAt'],
        where: {
          userQuestionId: createAnswerDto.userQuestionId,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      if (existingAnswer) {
        const [, updatedAnswers] = await this.answerRepository.update(
          { ...createAnswerDto },
          { where: { id: existingAnswer.id }, returning: true },
        );
        return updatedAnswers;
      }

      return await this.answerRepository.create(createAnswerDto);
    } catch (error) {
      throw new BadRequestException(
        { message: 'Failed to create or update answer' },
        error.message,
      );
    }
  }

  findAll(options: FindOptions<Answer>) {
    return this.answerRepository.findAll(options);
  }

  async sortAnswersOnDate(userId: number) {
    const answers = await this.findAll({
      attributes: ['id', 'response', 'userQuestionId', 'createdAt'],
      include: [
        {
          model: UserQuestion,
          attributes: [],
          where: {
            userId: userId,
          },
        },
      ],
    });

    const dates = [];

    answers.map((answer) => {
      const date = answer.createdAt
        .toISOString()
        .split('T')[0]
        .split('-')
        .reverse()
        .join('-');

      dates.push({
        date,
        answers: [],
      });
    });

    answers.map((answer) => {
      const date = answer.createdAt
        .toISOString()
        .split('T')[0]
        .split('-')
        .reverse()
        .join('-');

      dates.map((item) => {
        if (date === item.date) item.answers.push(answer);
      });
    });

    const mapFromDates = new Map(dates.map((item) => [item.date, item]));

    return [...mapFromDates.values()];
  }
}
