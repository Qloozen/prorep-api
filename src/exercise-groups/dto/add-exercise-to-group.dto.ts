import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddExerciseToGroupDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  groupId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  exerciseId: number;
}
