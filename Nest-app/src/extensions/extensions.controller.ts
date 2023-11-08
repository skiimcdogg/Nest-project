import { Controller, Get, Post, Delete, Param, Body, ValidationPipe } from '@nestjs/common';
import { ExtensionsService } from './extensions.service';
import { Extensions } from './extensions.entity';
import { CreateExtensionsDto } from './extensions-dtos/create-extensions-dto';

@Controller('extensions')
export class ExtensionsController {
    constructor(private readonly extensionsService: ExtensionsService) {}

    @Get('all')
    getAllExtensions(): Promise<Extensions[]> {
        return this.extensionsService.findAll();
    }

    @Get(':id')
    getOneExtensions(@Param('id') id: number): Promise<Extensions | null> {
        return this.extensionsService.findOne(id);
    }

    @Post('create')
    async CreateOneExtension(@Body(ValidationPipe) createExtensionDto: CreateExtensionsDto) {
        await this.extensionsService.createExtension(createExtensionDto)
    }

    @Delete(':id')
    async deleteOneExtensions(@Param('id') id: number): Promise<void> {
        await this.extensionsService.remove(id);
    }
}