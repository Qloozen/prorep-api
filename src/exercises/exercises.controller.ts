import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FirebaseUser } from 'src/shared/decorators/firebase-user/firebase-user.decorator';

@ApiBearerAuth()
@ApiTags('Exercises')
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  create(
    @Body() createExerciseDto: CreateExerciseDto,
    @FirebaseUser() { firebaseUID },
  ) {
    return this.exercisesService.create(createExerciseDto, firebaseUID);
  }

  @Get()
  findAllByUserId(
    @Query('userId') userId: string,
    @FirebaseUser() { firebaseUID },
  ) {
    if (!userId)
      throw new HttpException('Missing the userId', HttpStatus.BAD_REQUEST);
    if (userId != firebaseUID)
      throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);
    return this.exercisesService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @FirebaseUser() { firebaseUID }) {
    return this.exercisesService.findOne(+id, firebaseUID);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return this.exercisesService.update(+id, updateExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @FirebaseUser() { firebaseUID }) {
    return this.exercisesService.remove(+id, firebaseUID);
  }
}
