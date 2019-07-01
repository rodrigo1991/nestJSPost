import { Get, Post, Delete, Param, Controller, Put, Body } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';

import {
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from './user.entity';

@ApiBearerAuth()
//@ApiUseTags('users')
@Controller('users')
export class UserController {

  constructor(private readonly userservice: UserService) {}

  @Get()
  find(): Promise<User[]> {
    return this.userservice.findAll();
  }

  @Get(':id')
  async findMe(@Param('id') id: number): Promise<User> {
    return await this.userservice.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() usuario: User) {
    console.log(usuario);
    return await this.userservice.update(id, usuario);
  }

  @Post()
  async create(@Body() usuario: User) {
    console.log(usuario);
    return this.userservice.create(usuario);
  }

  /*
  @Delete('users/:slug')
  async delete(@Param() params) {
    return await this.userservice.delete(params.slug);
  }*/

}