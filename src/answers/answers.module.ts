import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { UserQuestionsModule } from '../user-questions/user-questions.module';
import { Answer } from './entities/answer.entity';

@Module({
  imports: [SequelizeModule.forFeature([Answer]), UserQuestionsModule],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
