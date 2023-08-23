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
} from '@nestjs/common';
import { SetsService } from './sets.service';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FirebaseUser } from 'src/shared/decorators/firebase-user/firebase-user.decorator';

@ApiBearerAuth()
@ApiTags('Sets')
@Controller('sets')
export class SetsController {
  constructor(private readonly setsService: SetsService) {}

  @Post()
  create(@Body() createSetDto: CreateSetDto, @FirebaseUser() { firebaseUID }) {
    return this.setsService.create(createSetDto, firebaseUID);
  }

  @ApiQuery({ name: 'exerciseId', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @Get()
  findAllByUserId(
    @Query('userId') userId: string,
    @Query('exerciseId') exerciseId: number,
    @Query('startDate') startdate: string,
    @Query('endDate') endDate: string,
    @FirebaseUser() { firebaseUID },
  ) {
    if (!userId)
      throw new HttpException('Missing the userId', HttpStatus.BAD_REQUEST);
    if (userId != firebaseUID)
      throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);

    let newStartDate: Date, newEndDate: Date;
    if (startdate && endDate) {
      newStartDate = new Date(startdate);
      newEndDate = new Date(endDate);

      if (isNaN(newStartDate.getTime()) || isNaN(newEndDate.getTime())) {
        throw new HttpException('Invalid date format', HttpStatus.BAD_REQUEST);
      }

      newEndDate.setHours(23);
      newEndDate.setMinutes(59);
      newEndDate.setSeconds(59);
      newEndDate.setMilliseconds(999);
    }

    return this.setsService.findAllByUserIdAndQueries(
      userId,
      exerciseId,
      newStartDate,
      newEndDate,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @FirebaseUser() { firebaseUID }) {
    return this.setsService.findOne(+id, firebaseUID);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSetDto: UpdateSetDto,
    @FirebaseUser() { firebaseUID },
  ) {
    return this.setsService.update(+id, updateSetDto, firebaseUID);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @FirebaseUser() { firebaseUID }) {
    return this.setsService.remove(+id, firebaseUID);
  }
}
