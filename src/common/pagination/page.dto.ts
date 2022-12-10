import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PageMetaDto } from "./page-meta.dto";

export class PageDto<T> {
    @IsArray() @ApiProperty({ isArray: true }) readonly data: any;

    constructor(data: T[], meta: PageMetaDto) {
        this.data = {
            content: data,
            ...meta,
        };
    }
}