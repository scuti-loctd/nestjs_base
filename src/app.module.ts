import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DB_NAME } from "./constant";
import { DatabaseProvider } from "./providers/database/database.provider";
import {CustomerModule} from "./module/customer/customer.module";
import { APP_GUARD } from '@nestjs/core';
import {JwtAuthGuard} from "./auth/guards/jwt-auth.guard";

@Module({
  imports: [
      AuthModule,
      CustomerModule,
      ConfigModule.forRoot({isGlobal: true,}),
      TypeOrmModule.forRootAsync({
        name: DB_NAME,
        imports: [ConfigModule],
        useClass: DatabaseProvider,
  })],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
