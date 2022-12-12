import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt/dist/interfaces';
import {Customer} from "../module/customer/entities/customer.entity";
import {AuthPayloadInterface} from "./interfaces/auth-payload.interface";
import {CustomerService} from "../module/customer/customer.service";
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
    private readonly jwtOption: JwtSignOptions = {};
    private readonly jwtVerifyOption: JwtVerifyOptions = {};

    constructor(
        @Inject(forwardRef(() => CustomerService))
        private readonly customerService: CustomerService,
        private readonly jwtService: JwtService,
    ) {
        this.jwtOption = {
            secret: `${process.env.JWT_SECRET_KEY}`,
            expiresIn: `${process.env.JWT_EXPIRE_TIME}`,
        };
        this.jwtVerifyOption = {
            secret: `${process.env.JWT_SECRET_KEY}`,
            ignoreExpiration: false,
        };
    }

    async verifyToken(token: string): Promise<any> {
        return await this.jwtService.verifyAsync(token, this.jwtVerifyOption);
    }

    validate(email: string): Promise<Customer> {
        return this.customerService.findByEmail(email);
    }

    generateToken(payload: AuthPayloadInterface): string {
        return this.jwtService.sign(payload, this.jwtOption);
    }
}
