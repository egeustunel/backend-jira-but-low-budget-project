import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: "Name can't be empty!" })
  public name: string;

  @IsEmail()
  @IsNotEmpty({ message: "Email can't be empty!" })
  public email: string;

  @IsString()
  @IsNotEmpty({ message: "Password can't be empty!" })
  public password: string;
}
