import { Controller, Get, Patch, Delete, Param, HttpCode } from '@nestjs/common';
import { CardFetcherService } from './card-fetcher.service';
import { CardFetcher } from './card-fetcher.entity';
import { log } from 'console';

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
    getOneCards(@Param('id') id: number): Promise<CardFetcher | null> {
        return this.cardFetcherService.findOne(id);
    }

    @Get('sets/:setName')
    getManyCardsFromOneExtension(@Param('setName') setName: string): Promise<CardFetcher[]> {
        return this.cardFetcherService.findManyWithExtensionName(setName);
    }

    @Patch('favorites/:id')
    async toggleFavoriteStatus(@Param('id') id: number): Promise<string> {
        const isFavorite = await this.cardFetcherService.toggleFavoriteStatus(id);
        const responseString = isFavorite ? `Card with ID ${id} set into favorites` : `Card with ID ${id} removed from favorites`;
        return responseString;
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteOneCards(@Param('id') id: number): Promise<void> {
        await this.cardFetcherService.remove(id);
    }
}