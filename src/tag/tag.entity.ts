import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn,  CreateDateColumn} from 'typeorm';
import {Ppost} from '../post/post.entity';

@Entity('tags', {schema: 'nestjsPost' } )
export class Tag {

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

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @ManyToMany(() => Ppost,  posts => posts.tags)
    @JoinTable({
        name: 'post_tag',
        joinColumn: {
            name: 'post_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'tag_id',
            referencedColumnName: 'id',
        },
    })
    posts: Ppost[];
}
