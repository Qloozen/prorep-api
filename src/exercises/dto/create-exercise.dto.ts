import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Bench Press' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Lie on a bench and press a barbell' })
  description: string;
}
