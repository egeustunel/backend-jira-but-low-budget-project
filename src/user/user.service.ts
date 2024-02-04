import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import { TokenManager } from '../../libs/classes/tokenManager';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from './repositories/user';

@Injectable()
export class UserService {
  private tokenManager: TokenManager;
  constructor(private repository: UserRepository) {
    this.tokenManager = new TokenManager();
  }
  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = this.createHash(createUserDto.password);
      const result = await this.repository.store(createUserDto);
      return result;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async login(data: LoginDto) {
    try {
      console.log('sadsadasd');
      console.log(data);
      const { email, password } = data;
      const checkUser = await this.repository.findByEmail(email);
      console.log(checkUser);

      // is there a user for the given email
      if (!checkUser)
        throw new InternalServerErrorException(
          new Error('User not found with the given credentials!'),
        );

      if (!this.compare(password, checkUser.password))
        throw new InternalServerErrorException(new Error('Password is wrong!'));

      // create the tokens
      const tokens = this.tokenManager.createToken({
        userId: checkUser.id,
      });

      // get the user
      const userData = await this.repository.findById(checkUser.id);

      return {
        ...tokens,
        ...userData,
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  findAll() {
    return this.repository.findAll();
  }

  createHash(password: string): string {
    return hashSync(password, 10);
  }

  compare(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }
}
