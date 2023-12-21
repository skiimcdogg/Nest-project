import { DataSource } from "typeorm"
import * as dotenv from 'dotenv';

dotenv.config({ path: "./.env"});

export const connectionSource = new DataSource({
    migrationsTableName: 'magic_cards_migrations',
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migrations/*.ts'],
});

connectionSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization : ", err)
    })