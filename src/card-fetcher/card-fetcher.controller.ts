import { Controller, Get, Patch, Delete, Param, Body, HttpCode, ValidationPipe } from '@nestjs/common';
import { CardFetcherService } from './card-fetcher.service';
import { CardFetcher } from './card-fetcher.entity';
import { UpdateFavoriteDto } from './card-fetcher-dtos/update-favorite-dto';

@Controller('card-fetcher')
export class CardFetcherController {
    constructor(private readonly cardFetcherService: CardFetcherService) {}

    @Get('cards')
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

    @Get(':setName')
    getManyCardsFromOneExtension(@Param('setName') setName: string): Promise<CardFetcher[]> {
        return this.cardFetcherService.findManyWithExtensionName(setName);
    }

    @Patch('/cards/favorite/:id')
    async setFavoriteStatus(@Param('id') id: number, @Body(ValidationPipe) updateFavoriteDto: UpdateFavoriteDto): Promise<void> {
        await this.cardFetcherService.updateFavoriteStatus(id, updateFavoriteDto)
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteOneCards(@Param('id') id: number): Promise<void> {
        await this.cardFetcherService.remove(id);
    }
}