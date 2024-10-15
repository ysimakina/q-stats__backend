import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { Dialect } from 'sequelize';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { TopicsModule } from './topics/topics.module';
import { Topic } from './topics/entities/topic.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: configService.get<Dialect>('POSTGRES_DB'),
        host: configService.get<string>('POSTGRES_HOST'),
        port: Number(configService.get<string>('POSTGRES_PORT')),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        models: [User, Topic],
        autoLoadModels: true,
      }),
    }),
    UsersModule,
    TopicsModule,
  ],
})
export class AppModule {}
