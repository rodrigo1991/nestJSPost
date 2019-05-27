import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Ppost } from '../post/post.entity';
import { User } from '../user/user.entity';
import { Tag } from '../tag/tag.entity';


@Entity('comments',{schema: 'nestjsPost' } )
@Index('fk_comments_1_idx',['post'])
@Index('fk_comments_2_idx',['user'])
export class Comment {

    @PrimaryGeneratedColumn({
        type:'int', 
        name:'id'
        })
    id: number;
        

   
    @ManyToOne(type=>Ppost, posts=>posts.comments,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'post_id'})
    post:Ppost | null;


   
    @ManyToOne(type=>User, users=>users.commentss,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'user_id'})
    user:User | null;


    @Column('varchar',{ 
        nullable:false,
        length:200,
        name:'texto'
        })
    texto:string;
        

    @CreateDateColumn({ 
        nullable:false,
        name:'created'
        })
    created:Date;
        

    @UpdateDateColumn({ 
        nullable:false,
        name:'updated'
        })
    updated:Date;
        

   
    @ManyToMany(type=>Tag, tags=>tags.comments)
    tags:Tag[];
    
}
