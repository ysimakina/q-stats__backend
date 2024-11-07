import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UserQuestion } from './entities/user-question.entity';
import { TopicQuestionsService } from '../topic-questions/topic-questions.service';

@Injectable()
export class CopyTopicQuestionsService {
  constructor(
    @InjectModel(UserQuestion) private userQuestionRepository: typeof UserQuestion,
    private readonly topicQuestionService: TopicQuestionsService,
  ) {}

  async copyQuestions(topicId: number, userId: number) {
    const topicQuestions = await this.topicQuestionService.findByTopic(topicId);

    const userQuestions = await this.userQuestionRepository.findAll({
      where: { userId, topicQuestionId: topicQuestions.map((question) => question.id) },
    });

    if (userQuestions.length) return [];

    const userQuestionsData = topicQuestions.map((question) => ({
      id: question.id,
      text: question.text,
      order: question.order,
      userId: userId,
      topicQuestionId: question.id,
      topicId: question.topicId,
    }));

    const createdUserQuestions = await this.userQuestionRepository.bulkCreate(userQuestionsData, {
      returning: true,
    });

    return createdUserQuestions.map((question) => question.id);
  }
}
