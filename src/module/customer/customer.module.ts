import {forwardRef, Module} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import {CustomerRepository} from "./customer.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "../../auth/auth.module";
import {Customer} from "./entities/customer.entity";
import {DB_NAME} from "../../constant";
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([Customer], DB_NAME)],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
  exports: [CustomerRepository, CustomerService, TypeOrmModule]
})
export class CustomerModule {}
