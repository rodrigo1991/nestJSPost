import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Ppost } from './post.entity';

@Injectable()
export class PostService extends TypeOrmCrudService<Ppost> {
  constructor(@InjectRepository(Ppost) repo) {
    super(repo);
  }
}