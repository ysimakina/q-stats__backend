import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Answer } from './entities/answer.entity';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';

@Module({
  imports: [SequelizeModule.forFeature([Answer])],
  controllers: [AnswersController],
  providers: [AnswersService],
  exports: [AnswersService],
})
export class AnswersModule {}
