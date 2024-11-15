import {
  Controller,
  Get,
  Param,
  ParseIntPipe
} from '@nestjs/common';

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
}
