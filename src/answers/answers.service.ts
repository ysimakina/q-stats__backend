import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, Op } from 'sequelize';

import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answer } from './entities/answer.entity';

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
}
