import { UnauthorizedException } from '@nestjs/common';

export class AuthorizationException extends UnauthorizedException {
    constructor(objectOrError?: string | object | any, description?: string) {
        super(objectOrError, description);
    }

    public static unauthorizedException(): AuthorizationException {
        return new AuthorizationException('Incorrect email address or password');
    }

    public static tokenExpiredException(): AuthorizationException {
        return new AuthorizationException('Token expired.');
    }

    public static tokenInvalidException(message: string): AuthorizationException {
        return new AuthorizationException(message);
    }
}
