import {Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn,  UpdateDateColumn} from 'typeorm';
import {Group} from '../group/group.entity';
import {Ppost} from '../post/post.entity';

@Entity('users', {schema: 'nestjsPost' } )
@Index('fk_users_1_idx', ['group' ])
export class User {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        })
    id: number;

    @ManyToOne(() => Group,  groups => groups.users, {  nullable: false, onDelete:  'NO ACTION', onUpdate:  'NO ACTION'})
    @JoinColumn({ name: 'fk_group_id' })
    group: Group;

    @Column('varchar', {
        nullable: false,
        length: 45,
        name: 'name',
        })
    name: string;

    @Column('varchar', {
        nullable: false,
        length: 45,
        name: 'surname',
        })
    surname: string;

    @Column('datetime', {
        nullable: false,
        name: 'birthdate',
        })
    birthdate: Date;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @OneToMany(() => Ppost,  posts => posts.user, { onDelete:  'NO ACTION' , onUpdate:  'NO ACTION' })
    posts: Ppost[];

}
