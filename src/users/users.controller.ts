import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll({ attributes: ['id', 'name'] });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id, {
      attributes: ['id', 'name'],
    });
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }
}
