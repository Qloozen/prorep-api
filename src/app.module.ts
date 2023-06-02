import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'data/database.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UserModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
