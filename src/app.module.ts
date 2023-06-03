import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'data/database.config';
import { UserModule } from './user/user.module';
import { ResponseInterceptor } from './shared/interceptors/response/response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExerciseGroupsModule } from './exercise-groups/exercise-groups.module';
import { ExercisesModule } from './exercises/exercises.module';
import { SetsModule } from './sets/sets.module';
import { AuthMiddleware } from './shared/middleware/auth/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UserModule,
    ExerciseGroupsModule,
    ExercisesModule,
    SetsModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}
