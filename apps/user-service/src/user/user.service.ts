import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { USER_ID_AND_EMAIL_NOT_MATCHED, USER_NOT_FOUND_BY_EMAIL, USER_NOT_FOUND_BY_ID, USER_STATUS_INVALID } from '../user-service.message';
import { Status } from './enums/user.status';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`${USER_NOT_FOUND_BY_ID} - ${id}`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      throw new NotFoundException(`${USER_NOT_FOUND_BY_ID} - ${id}`);
    }

    this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<any> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`${USER_NOT_FOUND_BY_ID} - ${id}`);
    }

    return result;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new NotFoundException(`${USER_NOT_FOUND_BY_EMAIL} - ${email}`)

    return user;
  }

  async updateStatus(status: Status, email: string) {
    if (!status && !email) throw new NotFoundException(USER_STATUS_INVALID);

    const user = await this.findByEmail(email);

    if (!user) throw new NotFoundException(USER_NOT_FOUND_BY_EMAIL);

    user.status = status;

    await this.userRepository.save(user)
  }

  async findByIdAndEmail(id: number, email: string) {
    const user = await this.userRepository.findOne({ where: { id, email } })

    if (!user) throw new UnauthorizedException(USER_ID_AND_EMAIL_NOT_MATCHED);

    return user;
  }
}
