import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateExerciseGroupDto } from './create-exercise-group.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateExerciseGroupDto extends PartialType(CreateExerciseGroupDto) {}
