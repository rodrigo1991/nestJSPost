import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, UpdateDateColumn, CreateDateColumn} from 'typeorm';
import {Comment} from '../comment/comment.entity';


@Entity('tags',{schema:'nestjsPost' } )
export class Tag {

    @PrimaryGeneratedColumn({
        type:'int', 
        name:'id'
        })
    id:number;
        

    @Column('varchar',{ 
        nullable:false,
        length:45,
        name:'name'
        })
    name:string;
        

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
        

   
    @ManyToMany(type=>Comment, comments=>comments.tags,{  nullable:false, })
    @JoinTable({ name:'comments_tags'})
    comments:Comment[];
    
}
