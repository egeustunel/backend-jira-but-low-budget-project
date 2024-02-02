import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Task } from './task.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  public createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  public updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  public deletedAt?: Date;

  @OneToMany(() => Task, (task) => task.user)
  public tasks: Task[];
}
