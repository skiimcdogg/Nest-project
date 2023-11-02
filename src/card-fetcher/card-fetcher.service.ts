import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardFetcher } from './card-fetcher.entity';

@Injectable()
export class CardFetcherService {
  constructor(
    @InjectRepository(CardFetcher)
    private usersRepository: Repository<CardFetcher>,
  ) {}

  findAll(): Promise<CardFetcher[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<CardFetcher | null> {
    return this.usersRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}