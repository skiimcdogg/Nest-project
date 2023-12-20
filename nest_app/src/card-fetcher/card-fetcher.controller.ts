import { Controller, Get, Patch, Delete, Param, HttpCode, NotFoundException } from '@nestjs/common';
import { CardFetcherService } from './card-fetcher.service';
import { CardFetcher } from './card-fetcher.entity';

@Controller('cards')
export class CardFetcherController {
    constructor(private readonly cardFetcherService: CardFetcherService) {}

    @Get('/')
    getAllCards(): Promise<CardFetcher[]> {        
        return this.cardFetcherService.findAll();
    }

    @Get('favorites')
    getAllFavoritesCards(): Promise<CardFetcher[]> {
        return this.cardFetcherService.findAllFavorites();
    }

    @Get(':id')
    getOneCards(@Param('id') id: number): Promise<CardFetcher> {
       return this.cardFetcherService.findOne(id);
    }

    @Get('sets/:setName')
    getManyCardsFromOneExtension(@Param('setName') setName: string): Promise<CardFetcher[]> {
        return this.cardFetcherService.findManyWithExtensionName(setName);
    }

    @Patch('favorites/:id')
    async toggleFavoriteStatus(@Param('id') id: number): Promise<CardFetcher> {
        const card = await this.cardFetcherService.toggleFavoriteStatus(id);
        return card;
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteOneCards(@Param('id') id: number): Promise<void> {
        await this.cardFetcherService.remove(id);
    }
}