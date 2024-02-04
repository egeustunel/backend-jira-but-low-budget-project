import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  public async findAll(): Promise<User[]> {
    return this.find();
  }

  public async findById(id: number): Promise<User | null> {
    return this.findOneBy({ id: id });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.findOneBy({ email: email });
  }

  public async store(user: CreateUserDto): Promise<User> {
    const newUser = this.create(user);
    return this.save(newUser);
  }
}
