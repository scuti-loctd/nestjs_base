import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {JwtStrategy} from "./strategies/jwt.strategy";
import * as dotenv from 'dotenv';
import {CustomerModule} from "../module/customer/customer.module";

dotenv.config();

@Module({
    imports: [
        JwtModule.register({
            secret: `${process.env.JWT_SECRET_KEY}`,
            signOptions: {
                expiresIn: `${process.env.JWT_EXPIRE_TIME}s`,
            },
        }),
        forwardRef(() => CustomerModule),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtService],
    exports: [AuthService]
})
export class AuthModule {
}
