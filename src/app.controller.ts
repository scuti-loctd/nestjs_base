import {Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import { AppService } from './app.service';
import {AuthGuard} from "@nestjs/passport";
import {LocalAuthGuard} from "./auth/guards/local-auth.guard";
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/guards/jwt-auth.guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
