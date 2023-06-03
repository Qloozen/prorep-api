import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateExerciseDto } from './create-exercise.dto';

export class UpdateExerciseDto extends PartialType(OmitType(CreateExerciseDto, ['userId'])) {}