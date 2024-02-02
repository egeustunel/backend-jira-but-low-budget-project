import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';
import { ClientGuard } from 'libs/guards/auth';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(ClientGuard)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @UseGuards(ClientGuard)
  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @UseGuards(ClientGuard)
  @Get('user/:id')
  findByUser(@Param('id') id: string) {
    return this.taskService.findByUser(+id);
  }

  @UseGuards(ClientGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @UseGuards(ClientGuard)
  @Post('update')
  update(@Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(updateTaskDto);
  }

  @UseGuards(ClientGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
