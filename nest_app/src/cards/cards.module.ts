import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardFetcherService } from './cards.service';
import { CardFetcherController } from './cards.controller';
import { Cards } from './cards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cards])],
  exports: [TypeOrmModule],
  providers: [CardFetcherService],
  controllers: [CardFetcherController],
})
export class CardFetcherModule {}