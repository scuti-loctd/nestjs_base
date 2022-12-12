import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerLoginDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
