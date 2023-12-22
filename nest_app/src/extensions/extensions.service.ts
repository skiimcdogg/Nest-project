import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Extensions } from './extensions.entity';
import { CreateUpdateExtensionsDto } from './extensions-dtos/create-update-extensions-dto';

@Injectable()
export class ExtensionsService {
  constructor(
    @InjectRepository(Extensions)
    private extensionsRepository: Repository<Extensions>,
  ) {}

  findAll(): Promise<Extensions[]> {
    return this.extensionsRepository.find();
  }

  async findOne(id: number): Promise<Extensions> {
    const extension = await this.extensionsRepository.findOneBy({id});
    if(!extension) {
      throw new NotFoundException(`Extension with ID ${id} not found.`)
    }
    return extension
  }

  async createExtension(createUpdateExtensionsDto: CreateUpdateExtensionsDto): Promise<Extensions> {
    const newExtension = this.extensionsRepository.create(createUpdateExtensionsDto)
    await this.extensionsRepository.save(newExtension)
    return newExtension
  }

  async updateExtension(id: number, createUpdateExtensionsDto: CreateUpdateExtensionsDto): Promise<Extensions> {
    const extension = await this.extensionsRepository.findOneBy({ id })
    if(!extension) {
      throw new NotFoundException(`Extension with ID ${id} not found.`)
    }
    Object.assign(extension, createUpdateExtensionsDto)
    this.extensionsRepository.save(extension)
    return extension
  }

  async remove(id: number): Promise<void> {
    await this.extensionsRepository.delete(id);
  }
}