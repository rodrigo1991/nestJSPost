import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupModule } from './group/group.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [TypeOrmModule.forRoot(), GroupModule, UserModule, TagModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
