import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswersService {
  constructor(@InjectModel(Answer) private answerRepository: typeof Answer) {}

  async createOrUpdate(createAnswerDto: CreateAnswerDto) {
    try {
      const currentDate = new Date().toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      const existingAnswer = await this.answerRepository.findOne({
        attributes: ['id', 'userQuestionId', 'response', 'date'],
        where: {
          userQuestionId: createAnswerDto.userQuestionId,
          date: currentDate,
        },
      });

      if (existingAnswer) {
        const [_, updatedAnswers] = await this.answerRepository.update(
          { ...createAnswerDto },
          { where: { id: existingAnswer.id }, returning: true },
        );
        return updatedAnswers;
      }

      return await this.answerRepository.create({ ...createAnswerDto, date: currentDate });
    } catch (error) {
      throw new BadRequestException('Failed to create or update answer');
    }
  }

  // создание ответов пустых для дефолтных вопросов
  async createEmptyAnswersForUserQuestions(userQuestionIds: number[]) {
    try {
      const existingAnswers = await this.answerRepository.findAll({
        where: {
          userQuestionId: userQuestionIds,
        },
        attributes: ['userQuestionId'],
      });

      const existingAnswerIds = existingAnswers.map((answer) => answer.userQuestionId);
      const missingAnswerIds = userQuestionIds.filter((id) => !existingAnswerIds.includes(id));

      const date = new Date().toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      const emptyAnswersData = missingAnswerIds.map((userQuestionId) => ({
        userQuestionId,
        response: null,
        date,
      }));

      if (emptyAnswersData.length) {
        this.answerRepository.bulkCreate(emptyAnswersData);
      }
    } catch (error) {
      throw new BadRequestException('Failed to create answer null for other questions');
    }
  }

  // создание ответа пустого для кастомного вопроса
  async createEmptyAnswerForUserQuestion(userQuestionId: number) {
    try {
      const date = new Date().toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
  
      await this.answerRepository.create({
        userQuestionId,
        response: null,
        date,
      });
    } catch (error) {
      throw new BadRequestException('Failed to create empty answer for user question');
    }
  }

  findAll() {
    return this.answerRepository.findAll({
      attributes: ['id', 'userQuestionId', 'response', 'date'],
      order: [['id', 'ASC']],
    });
  }
}
