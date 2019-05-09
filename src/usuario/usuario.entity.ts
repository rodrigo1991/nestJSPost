import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Group } from 'src/group/group.entity';

@Entity('usuarios')
export class Usuario {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @CreateDateColumn()
  birthdate: Date;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(type => Group, group => group.usuarios, {eager: true})
  group: Group;
}
