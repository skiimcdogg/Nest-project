import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Extensions } from './extensions.entity';

@Injectable()
export class ExtensionsService {
  constructor(
    @InjectRepository(Extensions)
    private usersRepository: Repository<Extensions>,
  ) {}

  findAll(): Promise<Extensions[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<Extensions | null> {
    return this.usersRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}