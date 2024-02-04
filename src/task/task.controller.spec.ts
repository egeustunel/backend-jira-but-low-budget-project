import { Test, TestingModule } from '@nestjs/testing';
import { TaskStatuses } from '../../libs/enums';
import { ClientGuard } from '../../libs/guards/auth';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './repositories/task';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { UpdateResult } from 'typeorm';

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        TaskService,
        {
          provide: TaskRepository,
          useValue: {
            store: jest.fn(),
            findAll: jest.fn(),
            findByUserId: jest.fn(),
            findById: jest.fn(),
            updateOne: jest.fn(),
            softDelete: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(ClientGuard)
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      })
      .compile();

    taskController = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = {
        userId: 1,
        title: 'Task Title',
        description: 'Task Description',
        status: TaskStatuses.Pending,
        dueDate: new Date('2022-02-10'),
      };

      jest
        .spyOn(taskService, 'create')
        .mockResolvedValueOnce({ id: 1, ...createTaskDto });
      const expectedResult = { id: 1, ...createTaskDto };

      expect(await taskController.create(createTaskDto)).toEqual(
        expectedResult,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const mockTasks = [
        {
          id: 1,
          title: 'Task 1',
          description: 'Description 1',
          status: TaskStatuses.Done,
          dueDate: new Date('2022-02-10'),
        },
        {
          id: 2,
          title: 'Task 2',
          description: 'Description 2',
          status: TaskStatuses.Done,
          dueDate: new Date('2022-02-10'),
        },
      ];

      jest.spyOn(taskService, 'findAll').mockResolvedValueOnce(mockTasks);

      expect(await taskController.findAll()).toEqual(mockTasks);
    });
  });

  describe('findByUser', () => {
    it('should return tasks for a specific user', async () => {
      const userId = 1;
      const mockTasks = [
        {
          id: 1,
          title: 'Task 1',
          description: 'Description 1',
          status: TaskStatuses.Done,
          dueDate: new Date('2022-02-10'),
          userId: 1,
        },
        {
          id: 2,
          title: 'Task 2',
          description: 'Description 2',
          status: TaskStatuses.Done,
          dueDate: new Date('2022-02-10'),
          userId: 1,
        },
      ];

      jest.spyOn(taskService, 'findByUser').mockResolvedValueOnce(mockTasks);

      expect(await taskController.findByUser(userId)).toEqual(mockTasks);
    });
  });

  describe('findOne', () => {
    it('should return a task by ID', async () => {
      const taskId = 1;
      const mockTask = {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
        status: TaskStatuses.Done,
        dueDate: new Date('2022-02-10'),
        userId: 1,
      };

      jest.spyOn(taskService, 'findOne').mockResolvedValueOnce(mockTask);

      expect(await taskController.findOne(taskId)).toEqual(mockTask);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const updateTaskDto: UpdateTaskDto = {
        id: 1,
        userId: 1,
        title: 'Updated Task Title',
        description: 'Updated Task Description',
        status: TaskStatuses.Done,
        dueDate: new Date('2022-02-10'),
      };

      const mockUpdatedTask = { id: 1, ...updateTaskDto };

      jest.spyOn(taskService, 'update').mockResolvedValueOnce({
        id: 1,
        userId: 1,
        title: 'Updated Task Title',
        description: 'Updated Task Description',
        status: TaskStatuses.Done,
        dueDate: new Date('2022-02-10'),
      });

      expect(await taskController.update(updateTaskDto)).toEqual(
        mockUpdatedTask,
      );
    });
  });

  describe('remove', () => {
    it('should remove a task by ID', async () => {
      const taskId = 1;
      const mockDeletedTask: UpdateResult = {
        raw: '',
        affected: 1,
        generatedMaps: [],
      };

      jest.spyOn(taskService, 'remove').mockResolvedValueOnce(mockDeletedTask);

      expect(await taskController.remove(taskId)).toEqual(mockDeletedTask);
    });
  });
});

// Note: Adjust the mock values based on your application's logic and use case.
