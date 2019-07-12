import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ppost } from 'src/post/post.entity';
import { PostService } from 'src/post/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Ppost])],
  providers: [UserService, PostService],
  controllers: [UserController],
})
export class UserModule {}
