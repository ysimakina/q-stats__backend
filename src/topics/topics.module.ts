import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { Topic } from './entities/topic.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService],
  imports: [SequelizeModule.forFeature([Topic])],
})
export class TopicsModule {}
