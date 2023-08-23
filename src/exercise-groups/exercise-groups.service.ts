import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExerciseGroupDto } from './dto/create-exercise-group.dto';
import { UpdateExerciseGroupDto } from './dto/update-exercise-group.dto';
import { ExerciseGroup } from './entities/exercise-group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, IsNull, Not, Repository, UpdateResult } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { AddExerciseToGroupDto } from './dto/add-exercise-to-group.dto';
import { RemoveExerciseFromGroupDto } from './dto/remove-exercise-from-group.dto';

@Injectable()
export class ExerciseGroupsService {
  constructor(
    @InjectRepository(ExerciseGroup)
    private exerciseGroupRepository: Repository<ExerciseGroup>,
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createExerciseGroupDto: CreateExerciseGroupDto, userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (createExerciseGroupDto.planned_on_day) {
      const existingGroup = await this.exerciseGroupRepository.findOne({
        where: {
          user: { id: userId },
          planned_on_day: createExerciseGroupDto.planned_on_day,
        },
      });
      if (existingGroup) {
        existingGroup.planned_on_day = null;
        await this.exerciseGroupRepository.save(existingGroup);
      }
    }

    const exerciseGroup = this.exerciseGroupRepository.create(
      createExerciseGroupDto,
    );
    exerciseGroup.user = user;
    return this.exerciseGroupRepository.save(exerciseGroup);
  }

  async addExerciseToGroup(
    addExerciseToGroupDto: AddExerciseToGroupDto,
    userId: string,
  ) {
    const { groupId, exerciseId } = addExerciseToGroupDto;
    const exerciseGroup = await this.exerciseGroupRepository.findOne({
      where: { id: groupId },
      relations: ['user', 'exercises'],
    });
    if (!exerciseGroup)
      throw new HttpException('ExerciseGroup not found', HttpStatus.NOT_FOUND);
    if (exerciseGroup.user.id != userId)
      throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);

    const exercise = await this.exerciseRepository.findOne({
      where: { id: exerciseId },
      relations: ['user'],
    });
    if (!exercise)
      throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND);
    if (exercise.user.id != userId)
      throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);

    exerciseGroup.exercises.push(exercise);
    return this.exerciseGroupRepository.save(exerciseGroup);
  }

  async removeExerciseFromGroup(
    removeExerciseFromGroupDto: RemoveExerciseFromGroupDto,
    userId: string,
  ) {
    const { groupId, exerciseId } = removeExerciseFromGroupDto;

    const exerciseGroup = await this.exerciseGroupRepository.findOne({
      where: { id: groupId },
      relations: ['user', 'exercises'],
    });
    if (!exerciseGroup)
      throw new HttpException('ExerciseGroup not found', HttpStatus.NOT_FOUND);
    if (!exerciseGroup.exercises.find((e) => e.id == exerciseId))
      throw new HttpException(
        'Exercise not found in group',
        HttpStatus.NOT_FOUND,
      );
    if (exerciseGroup.user.id != userId)
      throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);

    exerciseGroup.exercises = exerciseGroup.exercises.filter(
      (e) => e.id != exerciseId,
    );
    return this.exerciseGroupRepository.save(exerciseGroup);
  }

  findAllByUserId(userId: string) {
    return this.exerciseGroupRepository.find({
      where: { user: { id: userId } },
    });
  }

  findPlannedExerciseGroupsByUserId(userId: string) {
    return this.exerciseGroupRepository.find({
      where: { user: { id: userId }, planned_on_day: Not(IsNull()) },
    });
  }

  async findOne(id: number, firebaseUID: string) {
    const exerciseGroup = await this.exerciseGroupRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!exerciseGroup)
      throw new HttpException('ExerciseGroup not found', HttpStatus.NOT_FOUND);
    if (exerciseGroup.user.id != firebaseUID)
      throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);
    return exerciseGroup;
  }

  async update(
    id: number,
    updateExerciseGroupDto: UpdateExerciseGroupDto,
    userId: string,
  ) {
    const exists = await this.exerciseGroupRepository.exist({ where: { id } });
    if (!exists)
      throw new HttpException('ExerciseGroup not found', HttpStatus.NOT_FOUND);

    if (updateExerciseGroupDto.planned_on_day) {
      const existingGroup = await this.exerciseGroupRepository.findOne({
        where: {
          user: { id: userId },
          planned_on_day: updateExerciseGroupDto.planned_on_day,
        },
      });
      if (existingGroup && existingGroup.id != id) {
        existingGroup.planned_on_day = null;
        await this.exerciseGroupRepository.save(existingGroup);
      }
    }

    const result: UpdateResult = await this.exerciseGroupRepository.update(
      id,
      updateExerciseGroupDto,
    );
    if (result.affected != 1)
      throw new HttpException(
        'ExerciseGroup not updated',
        HttpStatus.NOT_MODIFIED,
      );
    return this.exerciseGroupRepository.findOne({ where: { id } });
  }

  async remove(id: number, firebaseUID: string) {
    const exerciseGroup = await this.exerciseGroupRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!id)
      throw new HttpException('ExerciseGroup not found', HttpStatus.NOT_FOUND);
    if (exerciseGroup.user.id != firebaseUID)
      throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);

    const result: DeleteResult = await this.exerciseGroupRepository.delete(id);
    if (result.affected != 1)
      throw new HttpException(
        'ExerciseGroup not deleted',
        HttpStatus.NOT_MODIFIED,
      );
    return { id };
  }
}
