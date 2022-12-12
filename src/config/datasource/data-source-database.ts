import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dataSourceDatabase: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DATABASE_LOCAL,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    logging: process.env.APP_ENV === 'develop',
    dropSchema: false,
    migrationsRun: false,
    entities: ['dist/**/*.entity.{js,ts}'],
    connectTimeoutMS: 0,
};

export default new DataSource({
    ...dataSourceDatabase,
    migrationsRun: true,
    migrations: ['src/migrations/*.{js,ts}'],
});
