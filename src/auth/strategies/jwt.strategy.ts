import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import {AuthPayloadInterface} from "../interfaces/auth-payload.interface";
import {Customer} from "../../module/customer/entities/customer.entity";
import {AuthService} from "../auth.service";

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: `${process.env.JWT_SECRET_KEY}`,
        });
    }

    async validate(payload: AuthPayloadInterface): Promise<Customer> {
        const { email }: AuthPayloadInterface = payload;
        return await this.authService.validate(email)
    }
}