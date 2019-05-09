import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupModule } from './group/group.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forRoot(), GroupModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
