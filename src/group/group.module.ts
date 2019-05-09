import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Usuario } from 'src/usuario/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Usuario])],
  providers: [GroupService, UsuarioService],
  controllers: [GroupController]
})
export class GroupModule {}
