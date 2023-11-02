import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardFetcherService } from './card-fetcher.service';
import { CardFetcherController } from './card-fetcher.controller';
import { CardFetcher } from './card-fetcher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CardFetcher])],
  exports: [TypeOrmModule],
  providers: [CardFetcherService],
  controllers: [CardFetcherController],
})
export class CardFetcherModule {}