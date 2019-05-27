import { Injectable, HttpException } from '@nestjs/common';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {

  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}

  async findAll(): Promise<Tag[]> {
    return await this.tagRepository.find();
  }

  async findById(id: number): Promise<Tag>{
    const tag = await this.tagRepository.findOne(id);

    if (!tag) {
      const errors = {User: ' not found'};
      throw new HttpException({errors}, 400);
    }

    return tag;
  }

  async create(tag: Tag): Promise<Tag> {

    const newTag = new Tag();
    newTag.name = tag.name;
    newTag.created = tag.created;
    newTag.updated = tag.updated;

    return await this.tagRepository.save(newTag);

  }

  async update(id: number, tag: Tag): Promise<Tag> {

    const newTag = await this.tagRepository.findOne(id);
    newTag.name = tag.name;
    console.log(newTag);

    return await this.tagRepository.save(newTag);
  }
}
