import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';

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
}
