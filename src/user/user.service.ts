import { Injectable, HttpException } from '@nestjs/common';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Group } from 'src/group/group.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findAllByGroupId(groupId: number): Promise<User[]> {
    return await this.userRepository.find({group: {id: groupId}});
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      const errors = {User: ' not found'};
      throw new HttpException({errors}, 400);
    }

    return user;
  }

  async create(user: User, group?: Group): Promise<User> {

    const newUser = new User();
    if (group) {
      newUser.group = group;
    }
    newUser.name = user.name;
    newUser.surname = user.surname;
    newUser.birthdate = user.birthdate;
    newUser.created = user.created;
    newUser.updated = user.updated;

    return await this.userRepository.save(newUser);

  }

  async update(id: number, user: User): Promise<User> {

    const newUser = await this.userRepository.findOne(id);
    newUser.name = user.name;
    newUser.surname = user.surname;
    console.log(newUser);

    return await this.userRepository.save(newUser);
  }
}
