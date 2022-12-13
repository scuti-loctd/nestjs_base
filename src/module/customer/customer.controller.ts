import {Controller, Get, Post, Body, Patch, Param, Delete, Inject} from '@nestjs/common';
import { CustomerService } from './customer.service';
import {REQUEST} from "@nestjs/core";
import { Request } from 'express';
import {ApiBearerAuth, ApiBody, ApiTags} from "@nestjs/swagger";
import {CustomerDto} from "./dto/customer.dto";
import {plainToInstance} from "class-transformer";
import {Public} from "../../decorators/public.decorator";
import {CustomerLoginDto} from "./dto/customer-login.dto";
import {CustomerLoginResponseDto} from "./dto/customer-login-response,dto";
import {Customer} from "./entities/customer.entity";

@ApiBearerAuth('access-token')
@Controller('customer')
@ApiTags('customer')
export class CustomerController {
  constructor(
      private readonly customerService: CustomerService,
      @Inject(REQUEST) private readonly request: Request
  ) {}

  @Get('me')
  getMyInfo(): CustomerDto {
    return plainToInstance(CustomerDto, this.request.user)
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Customer> {
    return this.customerService.findOne(+id);
  }

  @Public()
  @Post('login')
  @ApiBody({
    type: CustomerLoginDto,
  })
  login(@Body() { email, password }: CustomerLoginDto): Promise<CustomerLoginResponseDto> {
    return this.customerService.login(email, password);
  }
}
