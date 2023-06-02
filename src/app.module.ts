import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'data/database.config';
import { UserModule } from './user/user.module';
import { ResponseInterceptor } from './shared/response/response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExerciseGroupsModule } from './exercise-groups/exercise-groups.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UserModule,
    ExerciseGroupsModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    }
  ],
})
export class AppModule {}
