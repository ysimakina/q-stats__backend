import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  findAll(options: FindOptions<User>) {
    return this.userRepository.findAll(options);
  }

  findOne(id: number, options: FindOptions<User>) {
    return this.userRepository.findByPk(id, options);
  }

  async create(user: CreateUserDto) {
    try {
      return await this.userRepository.create(user);
    } catch (error) {
      throw new BadRequestException({ message: 'Failed to create user' }, error.message);
    }
  }
}
