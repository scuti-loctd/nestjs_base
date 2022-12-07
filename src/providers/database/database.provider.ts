import { Injectable} from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm";
import { dataSourceDatabase } from "../../config/datasource/data-source-database";

@Injectable()
export class DatabaseProvider implements TypeOrmOptionsFactory{
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            ...dataSourceDatabase,
        }
    }
}