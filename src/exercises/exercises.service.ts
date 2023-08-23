import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Exercise } from './entities/exercise.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createExerciseDto: CreateExerciseDto, userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const exercise = this.exerciseRepository.create(createExerciseDto);
    exercise.user = user;
    return this.exerciseRepository.save(exercise);
  }

  findAllByUserId(userId: string) {
    return this.exerciseRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findOne(id: number, firebaseUID: string) {
    const exercise = await this.exerciseRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!exercise)
      throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND);
    if (exercise.user.id != firebaseUID)
      throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);
    return exercise;
  }

  async update(id: number, updateExerciseDto: UpdateExerciseDto) {
    const exists = await this.exerciseRepository.exist({ where: { id } });
    if (!exists)
      throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND);

    const result: UpdateResult = await this.exerciseRepository.update(
      id,
      updateExerciseDto,
    );
    if (result.affected != 1)
      throw new HttpException('Exercise not updated', HttpStatus.NOT_MODIFIED);
    return this.exerciseRepository.findOne({ where: { id } });
  }

  async remove(id: number, firebaseUID: string) {
    const exercise = await this.exerciseRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!exercise)
      throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND);
    if (exercise.user.id != firebaseUID)
      throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);

    const result: DeleteResult = await this.exerciseRepository.delete(id);
    if (result.affected != 1)
      throw new HttpException('Exercise not deleted', HttpStatus.NOT_MODIFIED);
    return { id };
  }
}
