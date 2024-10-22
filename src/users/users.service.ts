import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: number) {
    return this.userRepository.findByPk(id);
  }
}
