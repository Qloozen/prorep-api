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
    @InjectRepository(Exercise) private exerciseRepository: Repository<Exercise>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  async create(createExerciseDto: CreateExerciseDto) {
    const user = await this.userRepository.findOne({ where: { id: createExerciseDto.userId } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  
    const exercise= this.exerciseRepository.create(createExerciseDto);
    exercise.user = user;
    return this.exerciseRepository.save(exercise);
  }

  findAllByUserId(userId: number) {
    return this.exerciseRepository.find({
      where: { user: { id: userId } }
    })
  }

  findOne(id: number) {
    const exercise = this.exerciseRepository.findOne({ where: { id } });
    if (!exercise) throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND);
    return exercise;
  }

  async update(id: number, updateExerciseDto: UpdateExerciseDto) {
    await this.handleExerciseExists(id);
    const result: UpdateResult = await this.exerciseRepository.update(id, updateExerciseDto);
    if (result.affected != 1) throw new HttpException('Exercise not updated', HttpStatus.NOT_MODIFIED);
    return this.exerciseRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    await this.handleExerciseExists(id);
    const result: DeleteResult = await this.exerciseRepository.delete(id);
    if (result.affected != 1) throw new HttpException('Exercise not deleted', HttpStatus.NOT_MODIFIED);
    return { id };
  }

  private async handleExerciseExists(id: number) {
    const exists = await this.exerciseRepository.exist({ where: { id }});
    if (!exists) throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND);
  }
}
