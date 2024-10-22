import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TopicQuestion } from './entities/topic-question.entity';
import { TopicQuestionsService } from './topic-questions.service';
import { TopicQuestionsController } from './topic-questions.controller';

@Module({
  controllers: [TopicQuestionsController],
  providers: [TopicQuestionsService],
  exports: [TopicQuestionsService],
  imports: [SequelizeModule.forFeature([TopicQuestion])],
})
export class TopicQuestionsModule {}
