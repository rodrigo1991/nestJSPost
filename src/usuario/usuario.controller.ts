import { Get, Post, Delete, Param, Controller, Put, Body } from '@nestjs/common';
import { Request } from 'express';
import { UsuarioService } from './usuario.service';

import {
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Usuario } from './usuario.entity';

@ApiBearerAuth()
//@ApiUseTags('usuarios')
@Controller('usuarios')
export class UsuarioController {

  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async find(): Promise<Usuario[]> {
    return await this.usuarioService.findAll();
  }

  @Get(':id')
  async findMe(@Param('id') id: number): Promise<Usuario> {
    return await this.usuarioService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() usuario: Usuario) {
    console.log(usuario);
    return await this.usuarioService.update(id, usuario);
  }

  @Post()
  async create(@Body() usuario: Usuario) {
    console.log(usuario);
    return this.usuarioService.create(usuario);
  }

  /*
  @Delete('usuarios/:slug')
  async delete(@Param() params) {
    return await this.usuarioService.delete(params.slug);
  }*/

}