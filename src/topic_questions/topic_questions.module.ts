import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TopicQuestion } from './entities/topic_question.entity';
import { TopicQuestionsService } from './topic_questions.service';
import { TopicQuestionsController } from './topic_questions.controller';

@Module({
  controllers: [TopicQuestionsController],
  providers: [TopicQuestionsService],
  exports: [TopicQuestionsService],
  imports: [SequelizeModule.forFeature([TopicQuestion])],
})
export class TopicQuestionsModule {}
