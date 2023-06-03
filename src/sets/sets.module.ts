import { Module } from '@nestjs/common';
import { SetsService } from './sets.service';
import { SetsController } from './sets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { User } from 'src/user/entities/user.entity';
import { Set } from './entities/set.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Set, User, Exercise])],
  controllers: [SetsController],
  providers: [SetsService]
})
export class SetsModule {}
