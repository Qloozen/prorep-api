import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExerciseGroupDto } from './dto/create-exercise-group.dto';
import { UpdateExerciseGroupDto } from './dto/update-exercise-group.dto';
import { ExerciseGroup } from './entities/exercise-group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, IsNull, Not, Repository, UpdateResult } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ExerciseGroupsService {

  constructor(
    @InjectRepository(ExerciseGroup) private exerciseGroupRepository: Repository<ExerciseGroup>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  async create(createExerciseGroupDto: CreateExerciseGroupDto) {
    const user = await this.userRepository.findOne({ where: { id: createExerciseGroupDto.userId } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const exerciseGroup = this.exerciseGroupRepository.create(createExerciseGroupDto);
    exerciseGroup.user = user;
    return this.exerciseGroupRepository.save(exerciseGroup);
  }

  findAllByUserId(userId: number) {
    return this.exerciseGroupRepository.find({
      where: { user: { id: userId } }
    });
  }

  findPlannedExerciseGroupsByUserId(userId: number) { 
    return this.exerciseGroupRepository.find({
      where: { user: { id: userId }, planned_on_day: Not(IsNull()) }
    });
  }

  async findOne(id: number) {
    const exerciseGroup = await this.exerciseGroupRepository.findOne({ where: { id } });
    if (!exerciseGroup) throw new HttpException('ExerciseGroup not found', HttpStatus.NOT_FOUND);
    return exerciseGroup;
  }

  async update(id: number, updateExerciseGroupDto: UpdateExerciseGroupDto) {
    await this.handleExerciseGroupExists(id);

    if (updateExerciseGroupDto.planned_on_day) { 
      const existingGroup = await this.exerciseGroupRepository.findOne({
        where: {
          user: { id: updateExerciseGroupDto.userId },
          planned_on_day: updateExerciseGroupDto.planned_on_day,
        },
      });
      if (existingGroup && existingGroup.id != id) { 
        existingGroup.planned_on_day = null;
        await this.exerciseGroupRepository.save(existingGroup);
      }
    }

    const result: UpdateResult = await this.exerciseGroupRepository.update(id, updateExerciseGroupDto)
    if (result.affected != 1) throw new HttpException('ExerciseGroup not updated', HttpStatus.NOT_MODIFIED);
    return this.exerciseGroupRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    await this.handleExerciseGroupExists(id);
    const result: DeleteResult = await this.exerciseGroupRepository.delete(id)
    if (result.affected != 1) throw new HttpException('ExerciseGroup not deleted', HttpStatus.NOT_MODIFIED);
    return {id};
  }

  private async handleExerciseGroupExists(id: number) {
    const exists = await this.exerciseGroupRepository.exist({ where: { id }});
    if (!exists) throw new HttpException('ExerciseGroup not found', HttpStatus.NOT_FOUND);
  }
}
