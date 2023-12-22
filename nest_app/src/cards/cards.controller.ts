import { Controller, Get, Patch, Delete, Param, HttpCode, NotFoundException } from '@nestjs/common';
import { CardFetcherService } from './cards.service';
import { Cards } from './cards.entity';

@Controller('cards')
export class CardFetcherController {
    constructor(private readonly cardFetcherService: CardFetcherService) {}

    @Get('/')
    getAllCards(): Promise<Cards[]> {        
        return this.cardFetcherService.findAll();
    }

    @Get('favorites')
    getAllFavoritesCards(): Promise<Cards[]> {
        return this.cardFetcherService.findAllFavorites();
    }

    @Get(':id')
    getOneCards(@Param('id') id: number): Promise<Cards> {
       return this.cardFetcherService.findOne(id);
    }

    @Get('extensions/:extensionName')
    getManyCardsFromOneExtension(@Param('extensionName') extensionName: string): Promise<Cards[]> {
        return this.cardFetcherService.findManyWithExtensionName(extensionName);
    }

    @Patch('favorites/:id')
    async toggleFavoriteStatus(@Param('id') id: number): Promise<Cards> {
        const card = await this.cardFetcherService.toggleFavoriteStatus(id);
        return card;
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteOneCards(@Param('id') id: number): Promise<void> {
        await this.cardFetcherService.remove(id);
    }
}