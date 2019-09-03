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

  //http://127.0.0.1:3000/api/users?filter=%7B%22name%22%3A%22Rodrigo%22%7D&relations[]=group&relations[]=posts
  async findAll(filter:string, sort:string, relations: string[]): Promise<User[]> {

    let jfilter: {};
    let jsort: {};

    console.log(filter);
    console.log(sort);
    if(filter){
      jfilter = JSON.parse(filter);
    }

    if(sort){
      jsort = JSON.parse(sort);
    }
    console.log({relations: relations});
    return await this.userRepository.find({
      where: jfilter, 
      relations: relations, 
      order: jsort
    });
  }

  //http://127.0.0.1:3000/api/users?filter=%7B%22group%22%3A+%7B%22id%22%3A+1%7D%7D&relations[]=group
  //async findAllByGroupId(groupId: number): Promise<User[]> {
    //return await this.userRepository.find({where: {group: {id: groupId}}, relations: ['group'] });
  //}

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id, {relations: ['group']});
    console.log(user);
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
