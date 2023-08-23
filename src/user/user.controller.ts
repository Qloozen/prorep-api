import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FirebaseUser } from 'src/shared/decorators/firebase-user/firebase-user.decorator';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @FirebaseUser() { firebaseUID, email },
  ) {
    createUserDto['id'] = firebaseUID;
    createUserDto['email'] = email;
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @FirebaseUser() { firebaseUID }) {
    if (id != firebaseUID)
      throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @FirebaseUser() { firebaseUID },
  ) {
    if (id != firebaseUID)
      throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @FirebaseUser() { firebaseUID }) {
    if (id != firebaseUID)
      throw new HttpException('Unauthorized action', HttpStatus.UNAUTHORIZED);
    return this.userService.remove(id);
  }
}
