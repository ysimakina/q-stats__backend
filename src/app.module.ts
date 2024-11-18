import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

import { AnswersModule } from './answers/answers.module';
import { Answer } from './answers/entities/answer.entity';
import { TopicQuestion } from './topic-questions/entities/topic-question.entity';
import { TopicQuestionsModule } from './topic-questions/topic-questions.module';
import { Topic } from './topics/entities/topic.entity';
import { TopicsModule } from './topics/topics.module';
import { UserQuestion } from './user-questions/entities/user-question.entity';
import { UserQuestionsModule } from './user-questions/user-questions.module';
import { User } from './users/entities/user.entity';
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
        models: [User, Topic, TopicQuestion, UserQuestion, Answer],
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    TopicsModule,
    TopicQuestionsModule,
    UserQuestionsModule,
    AnswersModule,
  ],
})
export class AppModule {}
