import {Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,  CreateDateColumn, ManyToMany} from 'typeorm';
import {User} from '../user/user.entity';
import {Tag} from '../tag/tag.entity';

@Entity('posts', {schema: 'nestjsPost' } )
@Index('fk_posts_1_idx', ['user'])
export class Ppost {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        })
    id: number;

    @ManyToOne(() => User,  users => users.postss, {  nullable: false, onDelete:  'NO ACTION', onUpdate:  'NO ACTION' })
    @JoinColumn({ name: 'user_id'})
    user: User | null;

    @Column('varchar', {
        nullable: false,
        length: 45,
        name: 'texto',
        })
    texto: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @ManyToMany(() => Tag,  tags => tags.posts)
    tags: Tag[];

}
