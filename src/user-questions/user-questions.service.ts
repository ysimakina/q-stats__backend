import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { TopicQuestion } from 'src/topic-questions/entities/topic-question.entity';
import { Topic } from 'src/topics/entities/topic.entity';
import { TopicQuestionsService } from 'src/topic-questions/topic-questions.service';
import { CreateUserQuestionDto } from './dto/create-user-question.dto';
import { UserQuestion } from './entities/user-question.entity';

@Injectable()
export class UserQuestionsService {
  constructor(
    @InjectModel(UserQuestion) private userQuestionRepository: typeof UserQuestion,
    private readonly topicQuestionService: TopicQuestionsService,
  ) {}

  async createDefaultQuestion({ topicQuestionId, text }: CreateUserQuestionDto, userId: number) {
    try {
      const userQuestion = await this.userQuestionRepository.findOne({
        attributes: ['order'],
        where: { userId },
        order: [['order', 'DESC']],
      });

      const nextOrder = userQuestion ? userQuestion.order + 1 : 1;

      return await this.userQuestionRepository.create({
        userId,
        topicQuestionId,
        text,
        order: nextOrder,
      });
    } catch (error) {
      throw new BadRequestException('Failed to create question');
    }
  }

  async createCustomQuestion({ topicId, text }: CreateUserQuestionDto, userId: number) {
    try {
      if (!topicId) throw new BadRequestException('Topic ID is required for custom question');

      const order = await this.getMergedQuestionsByTopic(userId, topicId);

      const nextOrder = order.length + 1;

      return this.userQuestionRepository.create({
        userId,
        topicId,
        text,
        order: nextOrder,
      });
    } catch (error) {
      throw new BadRequestException('Failed to create question');
    }
  }

  async getMergedQuestionsByTopic(userId, topicId) {
    try {
      const topicQuestions = await this.topicQuestionService.findByTopic(topicId);

      const userQuestions = await this.userQuestionRepository.findAll({
        attributes: ['id', 'text', 'order', 'topicId', 'topicQuestionId'],
        where: {
          userId: userId,
          [Op.or]: [{ topicId: topicId }, { '$topicQuestion.topicId$': topicId }],
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
        ],
        order: [['order', 'ASC']],
      });

      const userQuestionsMap = userQuestions.reduce((acc, question) => {
        acc[question.order] = question;
        return acc;
      }, {});

      const mergedQuestions = topicQuestions.map((topicQuestion) => {
        const userQuestion = userQuestionsMap[topicQuestion.order];
        return userQuestion || topicQuestion;
      });

      const customQuestions = userQuestions.filter(
        (question) => question.topicQuestionId === null && question.topicId === topicId,
      );

      return [...mergedQuestions, ...customQuestions];
    } catch (error) {
      throw new BadRequestException('Failed to get questions');
    }
  }
}
