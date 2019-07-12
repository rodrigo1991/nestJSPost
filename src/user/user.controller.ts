import { Get, Post, Delete, Param, Controller, Put, Body } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';

import {
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from './user.entity';
import { Ppost } from 'src/post/post.entity';
import { PostService } from 'src/post/post.service';

@ApiBearerAuth()
//@ApiUseTags('users')
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService,
              private readonly postService: PostService) {}

  @Get()
  async find(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findMe(@Param('id') id: number): Promise<User> {
    return await this.userService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User) {
    console.log(user);
    return await this.userService.update(id, user);
  }

  @Get(':id/posts')
  async findUsers(@Param('id') id: number): Promise<Ppost[]> {
    return await this.postService.findAllByUserId(id);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    console.log(user);
    return this.userService.create(user);
  }

  @Post(':id/posts')
  async createPost(@Param('id') id: number, @Body() post: Ppost): Promise<Ppost> {
    console.log(Ppost);
    const user = await this.userService.findById(id);
    return this.postService.create(post, user);
  }

  /*
  @Delete('users/:slug')
  async delete(@Param() params) {
    return await this.userService.delete(params.slug);
  }*/
}