import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags("Exercises")
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  @Get()
  findAll(@Query("userId") userId: number) {
    if (!userId) throw new HttpException('Missing the userId', HttpStatus.BAD_REQUEST);
    return this.exercisesService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.exercisesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateExerciseDto: UpdateExerciseDto) {
    return this.exercisesService.update(+id, updateExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.exercisesService.remove(+id);
  }
}
