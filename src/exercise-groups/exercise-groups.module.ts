import { Module } from '@nestjs/common';
import { ExerciseGroupsService } from './exercise-groups.service';
import { ExerciseGroupsController } from './exercise-groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseGroup } from './entities/exercise-group.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseGroup, User])],
  controllers: [ExerciseGroupsController],
  providers: [ExerciseGroupsService]
})
export class ExerciseGroupsModule {}
