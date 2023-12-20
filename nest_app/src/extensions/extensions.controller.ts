import { Controller, Get, Post, Delete, Param, Body, ValidationPipe } from '@nestjs/common';
import { ExtensionsService } from './extensions.service';
import { Extensions } from './extensions.entity';
import { CreateExtensionsDto } from './extensions-dtos/create-extensions-dto';

@Controller('extensions')
export class ExtensionsController {
    constructor(private readonly extensionsService: ExtensionsService) {}

    @Get('/')
    getAllExtensions(): Promise<Extensions[]> {
        return this.extensionsService.findAll();
    }

    @Get(':id')
    getOneExtensions(@Param('id') id: number): Promise<Extensions | null> {
        return this.extensionsService.findOne(id);
    }

    @Post('create')
    async CreateOneExtension(@Body(ValidationPipe) createExtensionDto: CreateExtensionsDto): Promise<string> {
        console.log("DTO", createExtensionDto);
          
        await this.extensionsService.createExtension(createExtensionDto)
        return `Extensions ${createExtensionDto["setName"]} created successfully.`
    }

    @Delete(':id')
    async deleteOneExtensions(@Param('id') id: number): Promise<string> {
        await this.extensionsService.remove(id);
        return `Extension with ID ${id} deleted.`
    }
}