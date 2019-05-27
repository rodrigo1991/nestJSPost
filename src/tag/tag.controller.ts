import { Get, Post, Delete, Param, Controller, Put, Body } from '@nestjs/common';
import { Request } from 'express';
import { TagService } from './tag.service';

import {
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Tag } from './tag.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@ApiBearerAuth()
@Controller('tags')
export class TagController {

  constructor(private readonly tagService: TagService,
              private readonly usuarioService: UserService) {}

  @Get()
  async find(): Promise<Tag[]> {
    return await this.tagService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Tag> {
    return await this.tagService.findById(id);
  }


  @Put(':id')
  async update(@Param('id') id: number, @Body() tag: Tag) {
    console.log(tag);
    return await this.tagService.update(id, tag);
  }

  @Post()
  async create(@Body() tag: Tag) {
    console.log(tag);
    return this.tagService.create(tag);
  }

  /*
  @Delete('tags/:slug')
  async delete(@Param() params) {
    return await this.tagService.delete(params.slug);
  }*/

}