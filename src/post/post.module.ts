import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ppost } from './post.entity';
import { Tag } from 'src/tag/tag.entity';
import { TagService } from 'src/tag/tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ppost, Tag])],
  providers: [PostService, TagService],
  controllers: [PostController],
})
export class PostModule {}
