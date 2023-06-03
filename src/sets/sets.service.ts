import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Set } from './entities/set.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SetsService {

  constructor(
    @InjectRepository(Set) private setRepository: Repository<Set>,
    @InjectRepository(Exercise) private exerciseRepository: Repository<Exercise>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }
  
  async create(createSetDto: CreateSetDto) {
    const { userId, exerciseId } = createSetDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const exercise = await this.exerciseRepository.findOne({
      where: { id: exerciseId },
      relations: ['user']
    });
    if (!exercise) throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND);
    if (exercise.user.id != userId) throw new HttpException('Incorrect exercise', HttpStatus.BAD_REQUEST);
    
    const set = this.setRepository.create(createSetDto);
    set.user = user;
    set.exercise = exercise;
    return this.setRepository.save(set);
  }

  findAllByUserId(userId: string) {
    return this.setRepository.find({
      where: { user: { id: userId } }
    })
  }

  async findOne(id: number, firebaseUID: string) {
    const set = await this.setRepository.findOne({
      where: { id },
      relations: ['user']
    });

    if (!set) throw new HttpException('Set not found', HttpStatus.NOT_FOUND);
    if (set.user.id != firebaseUID) throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);
    return set;
  }

  async update(id: number, updateSetDto: UpdateSetDto) {
    const exists = await this.setRepository.exist({ where: { id }});
    if (!exists) throw new HttpException('Set not found', HttpStatus.NOT_FOUND);

    const result: UpdateResult = await this.setRepository.update(id, updateSetDto);
    if (result.affected != 1) throw new HttpException('Set not updated', HttpStatus.NOT_MODIFIED);
    return this.setRepository.findOne({ where: { id } });
  }

  async remove(id: number, firebaseUID: string) {
    const set = await this.setRepository.findOne({
      where: { id },
      relations: ['user']
    });
    if (!set) throw new HttpException('Set not found', HttpStatus.NOT_FOUND);
    if (set.user.id != firebaseUID) throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);
    
    const result: DeleteResult = await this.setRepository.delete(id);
    if (result.affected != 1) throw new HttpException('Set not deleted', HttpStatus.NOT_MODIFIED);
    return { id };
  }
}
