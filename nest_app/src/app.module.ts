import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardFetcherModule } from './card-fetcher/card-fetcher.module';
import { ExtensionsModule } from './extensions/extensions.module';
import * as dotenv from 'dotenv';
import { Extensions } from './extensions/extensions.entity';
import { CardFetcher } from './card-fetcher/card-fetcher.entity';

dotenv.config({ path: "./.env"});

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    CardFetcherModule,
    ExtensionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
