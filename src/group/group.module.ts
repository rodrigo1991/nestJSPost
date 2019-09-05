import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User])],
  providers: [GroupService, UserService],
  controllers: [GroupController, UserController]
})
export class GroupModule {}
