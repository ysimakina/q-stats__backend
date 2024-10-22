import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { OutputGetTopicDto } from './dto/output-get-topic.dto';
import { TopicsService } from './topics.service';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  async findAll(): Promise<OutputGetTopicDto[]> {
    const topics = await this.topicsService.findAll();

    return plainToInstance(OutputGetTopicDto, topics, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OutputGetTopicDto> {
    const topic = await this.topicsService.findOne(id);

    return plainToInstance(OutputGetTopicDto, topic, {
      excludeExtraneousValues: true,
    });
  }
}
