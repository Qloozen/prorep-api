import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ExerciseGroupsService } from './exercise-groups.service';
import { CreateExerciseGroupDto } from './dto/create-exercise-group.dto';
import { UpdateExerciseGroupDto } from './dto/update-exercise-group.dto';
import { AddExerciseToGroupDto } from './dto/add-exercise-to-group.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags("Exercise Groups")
@Controller('exercise-groups')
export class ExerciseGroupsController {
  constructor(private readonly exerciseGroupsService: ExerciseGroupsService) {}

  @Post()
  create(@Body() createExerciseGroupDto: CreateExerciseGroupDto) {
    return this.exerciseGroupsService.create(createExerciseGroupDto);
  }

  @Post('add-exercise')
  addExerciseToGroup(@Body() addExerciseToGroupDto: AddExerciseToGroupDto) { 
    return this.exerciseGroupsService.addExerciseToGroup(addExerciseToGroupDto);
  }

  @Get()
  findAllByUserId(@Query('userId') userId: number) {
    if (!userId) throw new HttpException('Missing the userId', HttpStatus.BAD_REQUEST);
    return this.exerciseGroupsService.findAllByUserId(userId);
  }

  @Get('planned')
  getPlanned(@Query('userId') userId: number) {
    return this.exerciseGroupsService.findPlannedExerciseGroupsByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exerciseGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExerciseGroupDto: UpdateExerciseGroupDto) {
    return this.exerciseGroupsService.update(+id, updateExerciseGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseGroupsService.remove(+id);
  }
}
