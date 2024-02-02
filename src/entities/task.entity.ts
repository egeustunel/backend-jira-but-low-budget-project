import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { TaskStatuses } from 'libs/enums';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Column({ name: 'user_id', type: 'int', nullable: true })
  public userId?: number = null;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: TaskStatuses,
    enumName: 'TaskStatuses',
  })
  public status: TaskStatuses = TaskStatuses.Pending;

  @Column('date')
  dueDate: Date;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  public createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  public updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  public deletedAt?: Date;
}
