import { Injectable, HttpException } from '@nestjs/common';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Group } from 'src/group/group.entity';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) {}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findAllByGroupId(groupId: number): Promise<Usuario[]> {
    return await this.usuarioRepository.find({group: {id: groupId}});
  }

  async findById(id: number): Promise<Usuario>{
    const usuario = await this.usuarioRepository.findOne(id);

    if (!usuario) {
      const errors = {User: ' not found'};
      throw new HttpException({errors}, 400);
    }

    return usuario;
  }

  async create(usuario: Usuario, group?: Group): Promise<Usuario> {

    const newUsuario = new Usuario();
    if (group) {
      newUsuario.group = group;
    }
    newUsuario.name = usuario.name;
    newUsuario.surname = usuario.surname;
    newUsuario.created = usuario.created;
    newUsuario.updated = usuario.updated;

    return await this.usuarioRepository.save(newUsuario);

  }

  async update(id: number, usuario: Usuario): Promise<Usuario> {

    const newUsuario = await this.usuarioRepository.findOne(id);
    newUsuario.name = usuario.name;
    newUsuario.surname = usuario.surname;
    console.log(newUsuario);

    return await this.usuarioRepository.save(newUsuario);
  }
}
