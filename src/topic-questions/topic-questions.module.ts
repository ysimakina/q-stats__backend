import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TopicQuestion } from './entities/topic-question.entity';
import { TopicQuestionsController } from './topic-questions.controller';
import { TopicQuestionsService } from './topic-questions.service';

@Module({
  imports: [SequelizeModule.forFeature([TopicQuestion])],
  controllers: [TopicQuestionsController],
  providers: [TopicQuestionsService],
  exports: [TopicQuestionsService],
})
export class TopicQuestionsModule {}
