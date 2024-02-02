import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

export class TaskRepository extends Repository<Task> {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {
    super(
      taskRepository.target,
      taskRepository.manager,
      taskRepository.queryRunner,
    );
  }

  public async findAll(): Promise<Task[]> {
    return this.find();
  }

  public async findById(id: number): Promise<Task | null> {
    return this.findOneBy({ id: id });
  }

  public async findByUserId(userId: number): Promise<Task | null> {
    return this.findOneBy({ userId: userId });
  }

  public async store(task: CreateTaskDto): Promise<Task> {
    const newTask = this.create(task);
    return this.save(newTask);
  }

  public async updateOne(
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task | undefined> {
    const task = await this.findById(updateTaskDto.id);
    if (!task) return undefined;
    Object.assign(task, updateTaskDto);
    return this.save(task);
  }

  public async destroy(id: number): Promise<void> {
    await this.delete(id);
  }
}