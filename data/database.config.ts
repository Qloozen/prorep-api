import { DataSource, DataSourceOptions } from "typeorm";
import { config } from 'dotenv';
config();

export const databaseConfig: DataSourceOptions = {
    type: 'mysql',
    host: process.env.MYSQL_HOST ?? 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'prorep-db',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/data/migrations/*.js'],
};

const dataSource = new DataSource(databaseConfig);
export default dataSource;
