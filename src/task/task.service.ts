import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './repositories/task';

@Injectable()
export class TaskService {
  constructor(private repository: TaskRepository) {}
  create(createTaskDto: CreateTaskDto) {
    return this.repository.store(createTaskDto);
  }

  findAll(userId: number) {
    return this.repository.findByUserId(userId);
  }

  findByUser(userId: number) {
    return this.repository.findByUserId(userId);
  }

  findOne(id: number) {
    return this.repository.findById(id);
  }

  update(updateTaskDto: UpdateTaskDto) {
    return this.repository.updateOne(updateTaskDto);
  }

  remove(id: number) {
    return this.repository.softDelete(id);
  }
}
