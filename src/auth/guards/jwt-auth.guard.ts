import {ExecutionContext} from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import {Reflector} from "@nestjs/core";
import { AuthGuard } from '@nestjs/passport/dist';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly reflector: Reflector) {
        super();
    }
    canActivate(context: ExecutionContext): any {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
}
