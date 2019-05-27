import { Injectable, HttpException } from '@nestjs/common';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find();
  }

  async findById(id: number): Promise<Comment>{
    const comment = await this.commentRepository.findOne(id);

    if (!comment) {
      const errors = {User: ' not found'};
      throw new HttpException({errors}, 400);
    }

    return comment;
  }

  async create(comment: Comment): Promise<Comment> {

    const newComment = new Comment();
    newComment.texto = comment.texto;
    newComment.created = comment.created;
    newComment.updated = comment.updated;

    return await this.commentRepository.save(newComment);

  }

  async update(id: number, comment: Comment): Promise<Comment> {

    const newComment = await this.commentRepository.findOne(id);
    newComment.texto = comment.texto;
    console.log(newComment);

    return await this.commentRepository.save(newComment);
  }
}
