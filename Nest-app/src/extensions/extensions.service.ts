import { Injectable } from '@nestjs/common';
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

  findOne(id: number): Promise<Extensions | null> {
    return this.extensionsRepository.findOneBy({id});
  }

  async createExtension(createExtensionsDto: CreateExtensionsDto): Promise<void> {
    const extension = this.extensionsRepository.create(createExtensionsDto)
    await this.extensionsRepository.save(extension)
  }

  async remove(id: number): Promise<void> {
    await this.extensionsRepository.delete(id);
  }
}