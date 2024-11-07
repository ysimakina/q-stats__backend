import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TopicQuestionsModule } from '../topic-questions/topic-questions.module';
import { AnswersModule } from '../answers/answers.module';
import { UserQuestion } from './entities/user-question.entity';
import { UserQuestionsController } from './user-questions.controller';
import { UserQuestionsService } from './user-questions.service';
import { CopyTopicQuestionsService } from './copy-topic-question.service';

@Module({
  imports: [
    SequelizeModule.forFeature([UserQuestion]),
    TopicQuestionsModule,
    forwardRef(() => AnswersModule),
  ],
  controllers: [UserQuestionsController],
  providers: [UserQuestionsService, CopyTopicQuestionsService],
  exports: [CopyTopicQuestionsService, CopyTopicQuestionsService],
})
export class UserQuestionsModule {}
