import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { Answer } from '../answers/entities/answer.entity';
import { TopicQuestion } from '../topic-questions/entities/topic-question.entity';
import { TopicQuestionsService } from '../topic-questions/topic-questions.service';
import { CreateUserQuestionDto } from './dto/create-user-question.dto';
import { UpdateCustomQuestionDto } from './dto/update-custom-question-dto';
import { UserQuestion } from './entities/user-question.entity';
import { Topic } from '../topics/entities/topic.entity';

@Injectable()
export class UserQuestionsService {
  constructor(
    @InjectModel(UserQuestion)
    private userQuestionRepository: typeof UserQuestion,
    @Inject(Sequelize) private sequelize: Sequelize,
    private readonly topicQuestionService: TopicQuestionsService,
  ) {}

  findAll(options: FindOptions<UserQuestion>) {
    return this.userQuestionRepository.findAll(options);
  }

  async createCustomQuestion(
    { topicId, text }: CreateUserQuestionDto,
    userId: number,
  ) {
    try {
      if (!topicId)
        throw new BadRequestException(
          'Topic ID is required for custom question',
        );

      const order = await this.getMergedQuestionsByTopic(userId, topicId);

      const nextOrder = order.length + 1;

      return await this.userQuestionRepository.create({
        userId,
        topicId,
        text,
        order: nextOrder,
      });
    } catch (error) {
      throw new BadRequestException('Failed to create question', error.message);
    }
  }

  async updateCustomQuestion({ id, text }: UpdateCustomQuestionDto) {
    try {
      await this.userQuestionRepository.update({ text }, { where: { id } });
    } catch (error) {
      throw new BadRequestException('Failed to update question', error.message);
    }
  }

  async getMergedQuestionsByTopic(userId, topicId) {
    try {
      const topicQuestions = await this.topicQuestionService.findAll({
        where: { topicId },
        attributes: ['id', 'text', 'order'],
        order: [['order', 'ASC']],
      });

      const userQuestions = await this.findAll({
        attributes: ['id', 'text', 'order', 'topicId', 'topicQuestionId'],
        where: {
          userId: userId,
          [Op.or]: [{ topicId }, { '$topicQuestion.topicId$': topicId }],
        },
        include: [
          {
            model: TopicQuestion,
            attributes: [],
            include: [
              {
                model: Topic,
                attributes: ['id'],
              },
            ],
          },
          {
            model: Answer,
            attributes: ['id', 'response', 'createdAt'],
          },
        ],
        order: [['order', 'ASC']],
      });

      const userQuestionsMap = userQuestions.reduce((acc, question) => {
        acc[question.order] = question;
        return acc;
      }, {});

      const allUserQuestionsExist = topicQuestions.some(
        (topicQuestion) => userQuestionsMap[topicQuestion.order],
      );

      const mergedQuestions = allUserQuestionsExist
        ? userQuestions
        : topicQuestions;

      const simplifiedQuestions = mergedQuestions.map(
        (question) => question.dataValues,
      );

      return simplifiedQuestions;
    } catch (error) {
      throw new BadRequestException('Failed to get questions', error.message);
    }
  }

  async copyQuestions(topicId: number, userId: number) {
    const transaction = await this.sequelize.transaction();
    try {
      const topicQuestions = await this.topicQuestionService.findAll({
        where: { topicId },
        attributes: ['id', 'text', 'order', 'topicId'],
        order: [['order', 'ASC']],
      });

      const userQuestions = await this.findAll({
        attributes: ['id', 'topicQuestionId', 'userId'],
        where: { topicId, userId },
      });

      if (userQuestions.length) return;

      const userQuestionsData = topicQuestions.map((question) => ({
        text: question.text,
        order: question.order,
        userId: userId,
        topicQuestionId: question.id,
        topicId: question.topicId,
      }));

      const createdQuestions = await this.userQuestionRepository.bulkCreate(
        userQuestionsData,
        {
          returning: true,
          transaction,
        },
      );

      await transaction.commit();
      return createdQuestions;
    } catch (error) {
      await transaction.rollback();
      throw new BadRequestException('Failed to copy questions', error.message);
    }
  }

  async verifyUserQuestionExists(options: FindOptions<UserQuestion>) {
    try {
      return await this.userQuestionRepository.findOne(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async delete(options: FindOptions<UserQuestion>) {
    try {
      return await this.userQuestionRepository.destroy(options);
    } catch (error) {
      throw new BadRequestException('Failed to delete question', error.message);
    }
  }
}
