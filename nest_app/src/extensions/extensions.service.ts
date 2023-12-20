import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Extensions } from './extensions.entity';
import { CreateExtensionsDto } from './extensions-dtos/create-extensions-dto';

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

  async createExtension(createExtensionsDto: CreateExtensionsDto): Promise<Extensions> {
    const newExtension = this.extensionsRepository.create(createExtensionsDto)
    await this.extensionsRepository.save(newExtension)
    return newExtension
  }

  async remove(id: number): Promise<void> {
    await this.extensionsRepository.delete(id);
  }
}