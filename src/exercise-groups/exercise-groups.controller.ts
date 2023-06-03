import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ExerciseGroupsService } from './exercise-groups.service';
import { CreateExerciseGroupDto } from './dto/create-exercise-group.dto';
import { UpdateExerciseGroupDto } from './dto/update-exercise-group.dto';
import { AddExerciseToGroupDto } from './dto/add-exercise-to-group.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FirebaseUser } from 'src/shared/decorators/firebase-user/firebase-user.decorator';

@ApiBearerAuth()
@ApiTags("Exercise Groups")
@Controller('exercise-groups')
export class ExerciseGroupsController {
  constructor(private readonly exerciseGroupsService: ExerciseGroupsService) {}

  @Post()
  create(@Body() createExerciseGroupDto: CreateExerciseGroupDto, @FirebaseUser() { firebaseUID }) {
    if (createExerciseGroupDto.userId != firebaseUID) throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);
    return this.exerciseGroupsService.create(createExerciseGroupDto);
  }

  @Post('add-exercise')
  addExerciseToGroup(@Body() addExerciseToGroupDto: AddExerciseToGroupDto, @FirebaseUser() { firebaseUID }) { 
    if (addExerciseToGroupDto.userId != firebaseUID) throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);
    return this.exerciseGroupsService.addExerciseToGroup(addExerciseToGroupDto);
  }

  @Get()
  findAllByUserId(@Query('userId') userId: string, @FirebaseUser() { firebaseUID }) {
    if (!userId) throw new HttpException('Missing the userId', HttpStatus.BAD_REQUEST);
    if (userId != firebaseUID) throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED); 
    return this.exerciseGroupsService.findAllByUserId(userId);
  }

  @Get('planned')
  getPlanned(@Query('userId') userId: string, @FirebaseUser() { firebaseUID }) {
    if (!userId) throw new HttpException('Missing the userId', HttpStatus.BAD_REQUEST);
    if (userId != firebaseUID) throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED); 
    return this.exerciseGroupsService.findPlannedExerciseGroupsByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @FirebaseUser() { firebaseUID }) {
    return this.exerciseGroupsService.findOne(+id, firebaseUID);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateExerciseGroupDto: UpdateExerciseGroupDto, @FirebaseUser() { firebaseUID }) {
    if (updateExerciseGroupDto.userId != firebaseUID) throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);
    return this.exerciseGroupsService.update(+id, updateExerciseGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @FirebaseUser() { firebaseUID }) {
    return this.exerciseGroupsService.remove(+id, firebaseUID);
  }
}
