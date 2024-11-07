import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserQuestionsModule } from '../user-questions/user-questions.module';
import { Answer } from './entities/answer.entity';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([Answer]),
    forwardRef(() => UserQuestionsModule),
  ],
  controllers: [AnswersController],
  providers: [AnswersService],
  exports: [AnswersService],
})
export class AnswersModule {}
