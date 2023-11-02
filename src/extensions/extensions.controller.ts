import { Controller, Get, Delete, Param } from '@nestjs/common';
import { ExtensionsService } from './extensions.service';

@Controller('extensions')
export class ExtensionsController {
    constructor(private readonly extensionsService: ExtensionsService) {}

    @Get()
    getAllExtensions() {
        return this.extensionsService.findAll();
    }

    @Get(':id')
    getOneExtensions(@Param('id') id: number) {
        return this.extensionsService.findOne(id);
    }

    @Delete(':id')
    deleteOneExtensions(@Param('id') id: number) {
        return this.extensionsService.remove(id);
    }
}