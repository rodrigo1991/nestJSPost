import { Get, Post, Delete, Param, Controller, Put, Body } from '@nestjs/common';
import { Request } from 'express';
import { GroupService } from './group.service';

import {
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Group } from './group.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@ApiBearerAuth()
@Controller('groups')
export class GroupController {

  constructor(private readonly groupService: GroupService,
              private readonly userservice: UserService) {}

  @Get()
  async find(): Promise<Group[]> {
    return await this.groupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Group> {
    return await this.groupService.findById(id);
  }

  @Get(':id/users')
  async findUsers(@Param('id') id: number): Promise<User[]> {
    return await this.userservice.findAllByGroupId(id);
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

  @Post(':id/users')
  async createUser(@Param('id') id: number, @Body() usuario: User) {
    console.log(usuario);
    const group = await this.groupService.findById(id);
    return this.userservice.create(usuario, group);
  }

  /*
  @Delete('groups/:slug')
  async delete(@Param() params) {
    return await this.groupService.delete(params.slug);
  }*/

}