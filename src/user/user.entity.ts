import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import {Group} from '../group/group.entity';
import {Comment} from '../comment/comment.entity';
import {Ppost} from '../post/post.entity';


@Entity('users',{schema:'nestjsPost' } )
@Index('fk_users_1_idx',['group',])
export class User {

    @PrimaryGeneratedColumn({
        type:'int', 
        name:'id'
        })
    id:number;
        

   
    @ManyToOne(type=>Group, groups=>groups.userss,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'group_id'})
    group:Group | null;


    @Column('varchar',{ 
        nullable:false,
        length:45,
        name:'name'
        })
    name:string;
        

    @Column('varchar',{ 
        nullable:false,
        length:45,
        name:'surname'
        })
    surname:string;
        

    @Column('datetime',{ 
        nullable:false,
        name:'birthdate'
        })
    birthdate:Date;
        

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
        

   
    @OneToMany(type=>Comment, comments=>comments.user,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    commentss:Comment[];
    

   
    @OneToMany(type=>Ppost, posts=>posts.user,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    postss:Ppost[];
    
}
