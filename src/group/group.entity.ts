import {Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,  CreateDateColumn} from 'typeorm';
import {User} from '../user/user.entity';

@Entity('groups', {schema: 'nestjsPost' } )
export class Group {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        })
    id: number;

    @Column('varchar', {
        nullable: false,
        length: 45,
        name: 'name',
        })
    name: string;

    @Column('varchar', {
        nullable: false,
        length: 200,
        name: 'description',
        })
    description: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @OneToMany(() => User,  users => users.group, { onDelete:  'NO ACTION' , onUpdate:  'NO ACTION' })
    users: User[];
}
