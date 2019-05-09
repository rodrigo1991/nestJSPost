import { Injectable, HttpException } from '@nestjs/common';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';

@Injectable()
export class GroupService {

  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>
  ) {}

  async findAll(): Promise<Group[]> {
    return await this.groupRepository.find();
  }

  async findById(id: number): Promise<Group>{
    const group = await this.groupRepository.findOne(id);

    if (!group) {
      const errors = {User: ' not found'};
      throw new HttpException({errors}, 400);
    }

    return group;
  }

  async create(group: Group): Promise<Group> {

    const newGroup = new Group();
    newGroup.name = group.name;
    newGroup.description = group.description;
    newGroup.created = group.created;
    newGroup.updated = group.updated;

    return await this.groupRepository.save(newGroup);

  }

  async update(id: number, group: Group): Promise<Group> {

    const newGroup = await this.groupRepository.findOne(id);
    newGroup.name = group.name;
    newGroup.description = group.description;
    console.log(newGroup);

    return await this.groupRepository.save(newGroup);
  }
}
