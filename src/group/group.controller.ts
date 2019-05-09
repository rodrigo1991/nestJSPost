import { Get, Post, Delete, Param, Controller, Put, Body } from '@nestjs/common';
import { Request } from 'express';
import { GroupService } from './group.service';

import {
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Group } from './group.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Usuario } from 'src/usuario/usuario.entity';

@ApiBearerAuth()
//@ApiUseTags('groups')
@Controller('groups')
export class GroupController {

  constructor(private readonly groupService: GroupService,
              private readonly usuarioService: UsuarioService) {}

  @Get()
  async find(): Promise<Group[]> {
    return await this.groupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Group> {
    return await this.groupService.findById(id);
  }

  @Get(':id/usuarios')
  async findUsuarios(@Param('id') id: number): Promise<Usuario[]> {
    return await this.usuarioService.findAllByGroupId(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() group: Group) {
    console.log(group);
    return await this.groupService.update(id, group);
  }

  @Post()
  async create(@Body() group: Group) {
    console.log(group);
    return this.groupService.create(group);
  }

  @Post(':id/usuarios')
  async createUser(@Param('id') id: number, @Body() usuario: Usuario) {
    console.log(usuario);
    const group = await this.groupService.findById(id);
    return this.usuarioService.create(usuario, group);
  }

  /*
  @Delete('groups/:slug')
  async delete(@Param() params) {
    return await this.groupService.delete(params.slug);
  }*/

}