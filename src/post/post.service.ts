import { Injectable, HttpException } from '@nestjs/common';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ppost } from './post.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Ppost)
    private readonly postRepository: Repository<Ppost>
  ) {}

  async findAll(): Promise<Ppost[]> {
    return await this.postRepository.find({relations: ['user']});
  }

  async findAllByUserId(userId: number): Promise<Ppost[]> {
    return await this.postRepository.find({where: {user: {id: userId}}, relations: ['user']});
  }

  async findById(id: number): Promise<Ppost>{
    const post = await this.postRepository.findOne(id, {relations: ['user']});

    if (!post) {
      const errors = {Ppost: ' not found'};
      throw new HttpException({errors}, 400);
    }

    return post;
  }

  async create(post: Ppost, user?: User): Promise<Ppost> {

    const newPpost = new Ppost();
    if (user) {
      newPpost.user = user;
    }
    newPpost.texto = post.texto;
    newPpost.created = post.created;
    newPpost.updated = post.updated;

    return await this.postRepository.save(newPpost);

  }

  async update(id: number, post: Ppost): Promise<Ppost> {

    const newPpost = await this.postRepository.findOne(id);
    newPpost.texto = post.texto;
    console.log(newPpost);

    return await this.postRepository.save(newPpost);
  }
}
