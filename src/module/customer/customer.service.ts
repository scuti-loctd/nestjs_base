import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {CustomerRepository} from "./customer.repository";
import {AuthService} from "../../auth/auth.service";
import {CustomerLoginResponseDto} from "./dto/customer-login-response,dto";
import {Customer} from "./entities/customer.entity";
import {AuthorizationException} from "../../exceptions/authorization.exception";
import * as bcrypt from 'bcrypt';
import {AuthPayloadInterface} from "../../auth/interfaces/auth-payload.interface";

@Injectable()
export class CustomerService {
  constructor(
      @Inject(forwardRef(() => AuthService))
      private readonly authService: AuthService,
      private readonly customerRepository: CustomerRepository,
  ) {}

  findOne(id: number): Promise<Customer> {
    return this.customerRepository.findOneById(id);
  }

  async findByEmail(email: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: {
        email: email
      },
    });
    if (customer === null) {
      throw AuthorizationException.unauthorizedException();
    }
    return customer;
  }

  async login(email: string, password: string): Promise<CustomerLoginResponseDto> {
    const result = new CustomerLoginResponseDto();
    const customer: Customer = await this.findByEmail(email);
    const check = await bcrypt.compare(password, customer.password);
    if (!check) {
      throw AuthorizationException.unauthorizedException();
    }
    const jwtPayload: AuthPayloadInterface = {
      email: customer?.email,
      city: customer?.city,
    }
    result.customerId = customer.id;
    result.accessToken = this.authService.generateToken(jwtPayload);

    return result;
  }
}
