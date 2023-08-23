import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateExerciseGroupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Upper body' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'This is a description' })
  description: string;

  @IsNumber()
  @Min(1)
  @Max(7)
  @IsOptional()
  @ApiProperty({ example: 1 })
  planned_on_day?: number;
}
