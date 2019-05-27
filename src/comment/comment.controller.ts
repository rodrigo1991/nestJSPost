import { Get, Post, Delete, Param, Controller, Put, Body } from '@nestjs/common';
import { Request } from 'express';
import { CommentService } from './comment.service';

import {
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Comment } from './comment.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@ApiBearerAuth()
@Controller('comments')
export class CommentController {

  constructor(private readonly commentService: CommentService,
              private readonly usuarioService: UserService) {}

  @Get()
  async find(): Promise<Comment[]> {
    return await this.commentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Comment> {
    return await this.commentService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() comment: Comment) {
    console.log(comment);
    return await this.commentService.update(id, comment);
  }

  @Post()
  async create(@Body() comment: Comment) {
    console.log(comment);
    return this.commentService.create(comment);
  }


  /*
  @Delete('comments/:slug')
  async delete(@Param() params) {
    return await this.commentService.delete(params.slug);
  }*/

}