import { Get, Post, Delete, Param, Controller, Put, Body } from '@nestjs/common';
import { Request } from 'express';
import { PostService } from './post.service';

import {
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Ppost } from './post.entity';
import { Tag } from 'src/tag/tag.entity';
import { TagService } from 'src/tag/tag.service';

@ApiBearerAuth()
@Controller('posts')
export class PostController {

  constructor(private readonly postService: PostService,
              private readonly tagService: TagService) {}

  @Get()
  async find(): Promise<Ppost[]> {
    return await this.postService.findAll();
  }

  @Get(':id')
  async findMe(@Param('id') id: number): Promise<Ppost> {
    return await this.postService.findById(id);
  }


  @Get(':id/tags')
  async findTags(@Param('id') id: number): Promise<Tag[]> {
    return await this.tagService.findAllByPostId(id);
  }

  @Post(':id/tags')
  async createTag(@Param('id') id: number, @Body() tag: Tag): Promise<Tag> {
    const post = await this.postService.findById(id);
    return this.tagService.create(tag, post);
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