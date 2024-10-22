import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Topic } from './entities/topic.entity';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';

import { Topic } from './entities/topic.entity';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';

@Module({
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService],
  imports: [SequelizeModule.forFeature([Topic])],
})
export class TopicsModule {}
