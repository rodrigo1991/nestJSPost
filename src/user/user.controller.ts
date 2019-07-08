import { Get, Post, Delete, Param, Controller, Put, Body } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';

import {
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from './user.entity';

@ApiBearerAuth()
//@ApiUseTags('usuarios')
@Controller('users')
export class UserController {

  constructor(private readonly usuarioService: UserService) {}

  @Get()
  async find(): Promise<User[]> {
    return await this.usuarioService.findAll();
  }

  @Get(':id')
  async findMe(@Param('id') id: number): Promise<User> {
    return await this.usuarioService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() usuario: User) {
    console.log(usuario);
    return await this.usuarioService.update(id, usuario);
  }

  @Post()
  async create(@Body() usuario: User) {
    console.log(usuario);
    return this.usuarioService.create(usuario);
  }

  /*
  @Delete('usuarios/:slug')
  async delete(@Param() params) {
    return await this.usuarioService.delete(params.slug);
  }*/

}