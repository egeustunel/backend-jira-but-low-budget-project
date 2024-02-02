import { IsDate, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TaskStatuses } from 'libs/enums';

export class CreateTaskDto {
  @IsNumber()
  public userId: number;

  @IsString()
  @IsNotEmpty({ message: "Title can't be empty!" })
  public title: string;

  @IsString()
  @IsNotEmpty({ message: "Description can't be empty!" })
  public description: string;

  @IsEnum(TaskStatuses)
  @IsNotEmpty({ message: "Status can't be empty!" })
  public status: number;

  @IsDateString()
  @IsNotEmpty({ message: "Due date can't be empty!" })
  public dueDate: string;
}
