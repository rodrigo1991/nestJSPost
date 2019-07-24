import { Injectable, HttpException } from '@nestjs/common';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { Ppost } from 'src/post/post.entity';

@Injectable()
export class TagService {

  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}

  async findAll(): Promise<Tag[]> {
    return await this.tagRepository.find({relations: ['posts']});
  }

  async findById(id: number): Promise<Tag>{
    const tag = await this.tagRepository.findOne(id, {relations: ['posts']});

    if (!tag) {
      const errors = {User: ' not found'};
      throw new HttpException({errors}, 400);
    }

    return tag;
  }

  async findAllByPostId(postId: number): Promise<Tag[]> {

    return await this.tagRepository.createQueryBuilder("tag")
    //.leftJoinAndSelect("tag.posts", "posts")
    .leftJoin("tag.posts", "posts")
    .where("posts.id = :id", { id: postId })
    .getMany();
  }

  async create(tag: Tag): Promise<Tag> {

    const newTag = new Tag();
    newTag.name = tag.name;
    newTag.created = tag.created;
    newTag.updated = tag.updated;

    return await this.tagRepository.save(newTag);

  }

  async createWithPost(tag: Tag, post: Ppost): Promise<Tag> {

    const newTag = this.tagRepository.create(tag);
    newTag.posts = [post];

    return await this.tagRepository.save(newTag);

  }

  async update(id: number, tag: Tag): Promise<Tag> {

    const newTag = await this.tagRepository.findOne(id);
    newTag.name = tag.name;
    console.log(newTag);

    return await this.tagRepository.save(newTag);
  }
}
