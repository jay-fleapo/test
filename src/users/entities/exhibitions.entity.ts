import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'exhibitions' })
@ObjectType()
export class Exhibitions {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true, select: false })
  name?: string;

  @Column({ nullable: true, select: false })
  number?: number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.exhibitions, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Index()
  user: Relation<User>;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  @Field({ nullable: true })
  deletedAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field()
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createdAt: Date;
}
