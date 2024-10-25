import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

import { Topic } from './topics/entities/topic.entity';
import { User } from './users/entities/user.entity';
import { TopicQuestion } from './topic-questions/entities/topic-question.entity';
import { UserQuestion } from './user-questions/entities/user-question.entity';
import { TopicQuestionsModule } from './topic-questions/topic-questions.module';
import { UserQuestionsModule } from './user-questions/user-questions.module';
import { TopicsModule } from './topics/topics.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: configService.get<Dialect>('POSTGRES_DIALECT'),
        host: configService.get<string>('POSTGRES_HOST'),
        port: Number(configService.get<string>('POSTGRES_PORT')),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        models: [User, Topic, TopicQuestion, UserQuestion],
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    TopicsModule,
    TopicQuestionsModule,
    UserQuestionsModule,
  ],
})
export class AppModule {}
