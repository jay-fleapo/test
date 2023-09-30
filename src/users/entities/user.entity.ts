import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Academics } from './academics.entity';
import { Exhibitions } from './exhibitions.entity';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ name: 'name', nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ unique: true, nullable: true })
  @Field({ nullable: true })
  email?: string;

  @Column({ nullable: true, select: false })
  password?: string;

  @OneToMany(() => Academics, ({ user }) => user)
  academics: Academics[];

  @OneToMany(() => Exhibitions, ({ user }) => user)
  exhibitions: Exhibitions[];

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
