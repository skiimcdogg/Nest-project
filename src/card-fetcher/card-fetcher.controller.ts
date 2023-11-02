import { Controller, Get, Delete, Param } from '@nestjs/common';
import { CardFetcherService } from './card-fetcher.service';

@Controller('card-fetcher')
export class CardFetcherController {
    constructor(private readonly cardFetcherService: CardFetcherService) {}

    @Get()
    getAllCards() {
        return this.cardFetcherService.findAll();
    }

    @Get(':id')
    getOneCards(@Param('id') id: number) {
        return this.cardFetcherService.findOne(id);
    }

    @Delete(':id')
    deleteOneCards(@Param('id') id: number) {
        return this.cardFetcherService.remove(id);
    }
}