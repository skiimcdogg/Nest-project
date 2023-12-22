import { Controller, Get, Post, Patch, Delete, Param, Body, ValidationPipe } from '@nestjs/common';
import { ExtensionsService } from './extensions.service';
import { Extensions } from './extensions.entity';
import { CreateExtensionsDto } from './extensions-dtos/create-extensions-dto';
import { UpdateExtensionsDto } from './extensions-dtos/update-extensions-dto';

@Controller('extensions')
export class ExtensionsController {
    constructor(private readonly extensionsService: ExtensionsService) {}

    @Get('/')
    getAllExtensions(): Promise<Extensions[]> {
        return this.extensionsService.findAll();
    }

    @Get(':id')
    getOneExtensions(@Param('id') id: number): Promise<Extensions> {
        return this.extensionsService.findOne(id);
    }

    @Post('/')
    async createExtension(@Body(ValidationPipe) createExtensionDto: CreateExtensionsDto): Promise<Extensions> {          
        const newExtension = await this.extensionsService.createExtension(createExtensionDto)
        return newExtension
    }

    @Patch(':id')
    async updateExtension(@Param('id') id: number, @Body(ValidationPipe) updateExtensionDto: UpdateExtensionsDto): Promise<Extensions> {
        return await this.extensionsService.updateExtension(id, updateExtensionDto)
    }

    @Delete(':id')
    async deleteOneExtensions(@Param('id') id: number): Promise<string> {
        await this.extensionsService.remove(id);
        return `Extension with ID ${id} deleted.`
    }
}