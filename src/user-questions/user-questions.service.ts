import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { TopicQuestion } from 'src/topic-questions/entities/topic-question.entity';
import { Topic } from 'src/topics/entities/topic.entity';
import { UserQuestion } from './entities/user-question.entity';
import { TopicQuestionsService } from 'src/topic-questions/topic-questions.service';
import { CreateUserQuestionDto } from './dto/create-user-question.dto';
import { UpdateUserTopicQuestionDto } from './dto/update-user-topic-question.dto';
import { UpdateCustomQuestionDto } from './dto/update-custom-question-dto';
import { Answer } from 'src/answers/entities/answer.entity';

@Injectable()
export class UserQuestionsService {
  constructor(
    @InjectModel(UserQuestion) private userQuestionRepository: typeof UserQuestion,
    private readonly topicQuestionService: TopicQuestionsService,
  ) {}

  async createOrUpdateDefaultQuestion(
    { topicQuestionId, text }: UpdateUserTopicQuestionDto,
    userId: number,
  ) {
    try {
      const userQuestion = await this.topicQuestionService.findOne(topicQuestionId);

      return await this.userQuestionRepository.upsert({
        userId,
        topicQuestionId,
        text,
        order: userQuestion.order,
      });
    } catch (error) {
      throw new BadRequestException('Failed to create or update question');
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

  async updateCustomQuestion({ id, text }: UpdateCustomQuestionDto) {
    try {
      await this.userQuestionRepository.update({ text }, { where: { id } });
    } catch (error) {
      throw new BadRequestException('Failed to update question');
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
          {
            model: Answer,
            attributes: ['id', 'response', 'date'],
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
      throw new BadRequestException('Failed to get questions', error.message);
    }
  }
}
