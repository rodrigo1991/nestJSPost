import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, UpdateDateColumn, CreateDateColumn} from 'typeorm';
import {User} from '../user/user.entity';
import {Comment} from '../comment/comment.entity';


@Entity('posts',{schema:'nestjsPost' } )
@Index('fk_posts_1_idx',['user',])
export class Ppost {

    @PrimaryGeneratedColumn({
        type:'int', 
        name:'id'
        })
    id:number;
        

   
    @ManyToOne(type=>User, users=>users.postss,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'user_id'})
    user:User | null;


    @Column('varchar',{ 
        nullable:false,
        length:45,
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
        

   
    @OneToMany(type=>Comment, comments=>comments.post,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    comments:Comment[];
    
}
