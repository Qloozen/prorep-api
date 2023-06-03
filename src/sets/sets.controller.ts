import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { SetsService } from './sets.service';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FirebaseUser } from 'src/shared/decorators/firebase-user/firebase-user.decorator';

@ApiBearerAuth()
@ApiTags("Sets")
@Controller('sets')
export class SetsController {
  constructor(private readonly setsService: SetsService) {}

  @Post()
  create(@Body() createSetDto: CreateSetDto, @FirebaseUser() { firebaseUID }) {
    if (createSetDto.userId != firebaseUID) throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);
    return this.setsService.create(createSetDto);
  }

  @Get()
  findAllByUserId(@Query('userId') userId: string, @FirebaseUser() { firebaseUID }) {
    if (!userId) throw new HttpException('Missing the userId', HttpStatus.BAD_REQUEST);
    if (userId != firebaseUID) throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);
    return this.setsService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @FirebaseUser() { firebaseUID }) {
    return this.setsService.findOne(+id, firebaseUID);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetDto: UpdateSetDto, @FirebaseUser() { firebaseUID }) {
    if (updateSetDto.userId != firebaseUID) throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);
    return this.setsService.update(+id, updateSetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @FirebaseUser() { firebaseUID }) {
    return this.setsService.remove(+id, firebaseUID);
  }
}
