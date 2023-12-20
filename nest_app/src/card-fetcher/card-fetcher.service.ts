import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardFetcher } from './card-fetcher.entity';

@Injectable()
export class CardFetcherService {
  constructor(
    @InjectRepository(CardFetcher)
    private cardFetcherRepository: Repository<CardFetcher>,
  ) {}

  findAll(): Promise<CardFetcher[]> {
    return this.cardFetcherRepository.find();
  }

  findAllFavorites(): Promise<CardFetcher[]> {
    return this.cardFetcherRepository.findBy({ isFavorite: true })
  }

  findManyWithExtensionName(setNameValue: string): Promise<CardFetcher[]> {
    return this.cardFetcherRepository.find({ where: {
      setName: setNameValue
    },
  })
  }

  async findOne(id: number): Promise<CardFetcher> {
    const card = await this.cardFetcherRepository.findOneBy({ id });
    if(!card) {
      throw new NotFoundException(`Card with ID ${id} not found.`)
    }
    return card
  }

  async toggleFavoriteStatus(id: number): Promise<CardFetcher> {
    const card = await this.cardFetcherRepository.findOneBy({ id })
    if(!card) {
      throw new NotFoundException(`Card with ID ${id} not found.`)
    }
    card.isFavorite = !card.isFavorite;
    await this.cardFetcherRepository.save(card);
    return card
  }

  async remove(id: number): Promise<void> {
    await this.cardFetcherRepository.delete(id);
  }
}