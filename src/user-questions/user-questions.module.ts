import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TopicQuestionsModule } from 'src/topic-questions/topic-questions.module';
import { UserQuestion } from './entities/user-question.entity';
import { UserQuestionsController } from './user-questions.controller';
import { UserQuestionsService } from './user-questions.service';

@Module({
  imports: [SequelizeModule.forFeature([UserQuestion]), TopicQuestionsModule],
  controllers: [UserQuestionsController],
  providers: [UserQuestionsService],
})

export class UserQuestionsModule {}
