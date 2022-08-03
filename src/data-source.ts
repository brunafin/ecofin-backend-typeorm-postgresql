import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT) || undefined,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [__dirname + '/entities/**/*.ts', __dirname + '/entities/**/*.js'],
    migrations: [__dirname + '/migrations/**/*.ts', __dirname + '/migrations/**/*.js'],
    synchronize: true
})