import { Get, Post, Delete, Param, Controller, Put, Body } from '@nestjs/common';
import { Request } from 'express';
import { PostService } from './post.service';

import {
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Ppost } from './post.entity';

@ApiBearerAuth()
@Controller('posts')
export class PostController {

  constructor(private readonly postService: PostService) {}

  @Get()
  async find(): Promise<Ppost[]> {
    return await this.postService.findAll();
  }

  @Get(':id')
  async findMe(@Param('id') id: number): Promise<Ppost> {
    return await this.postService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() post: Ppost) {
    console.log(post);
    return await this.postService.update(id, post);
  }

  @Post()
  async create(@Body() post: Ppost) {
    console.log(post);
    return this.postService.create(post);
  }

  /*
  @Delete('posts/:slug')
  async delete(@Param() params) {
    return await this.postService.delete(params.slug);
  }*/

}