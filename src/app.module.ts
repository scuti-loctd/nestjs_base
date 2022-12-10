import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DB_NAME } from "./constant";
import { DatabaseProvider } from "./providers/database/database.provider";

@Module({
  imports: [
      AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
  TypeOrmModule.forRootAsync({
    name: DB_NAME,
    imports: [ConfigModule],
    useClass: DatabaseProvider,

  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
