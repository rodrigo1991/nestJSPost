import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ppost } from './post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ppost])],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
