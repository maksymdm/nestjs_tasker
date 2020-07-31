import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as path from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'maximco',
    password: 'postgres',
    database: 'taskmanagement',
    entities: [path.join(__dirname, './../**/*.entity.*')],
    synchronize: true
}