import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Group } from './group.entity';

@Injectable()
export class GroupService extends TypeOrmCrudService<Group> {
  constructor(@InjectRepository(Group) repo) {
    super(repo);
  }
}