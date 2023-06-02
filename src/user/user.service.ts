import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.handleUserExists(id);
    const result: UpdateResult = await this.userRepository.update(id, updateUserDto)
    if (result.affected != 1) throw new HttpException('User not updated', HttpStatus.NOT_MODIFIED);
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    await this.handleUserExists(id);
    const result: DeleteResult = await this.userRepository.delete(id)
    if (result.affected != 1) throw new HttpException('User not deleted', HttpStatus.NOT_MODIFIED);
    return {id};
  }

  private async handleUserExists(id: number) {
    const exists = await this.userRepository.exist({ where: { id }});
    if (!exists) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
