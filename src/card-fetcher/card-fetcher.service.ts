import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardFetcher } from './card-fetcher.entity';
import { UpdateFavoriteDto } from './card-fetcher-dtos/update-favorite-dto';

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
    return this.cardFetcherRepository.findBy({ favorite: true })
  }

  findManyWithExtensionName(setNameValue: string): Promise<CardFetcher[]> {
    return this.cardFetcherRepository.findBy({ setName: setNameValue })
  }

  findOne(id: number): Promise<CardFetcher | null> {
    return this.cardFetcherRepository.findOneBy({ id });
  }

  async updateFavoriteStatus(id: number, updateFavoriteDto: UpdateFavoriteDto): Promise<void> {
    const card = await this.cardFetcherRepository.findOneBy({ id })
    if(!card) {
      throw new NotFoundException(`Card with ID ${id} not found.`)
    }
    card.favorite = !updateFavoriteDto.favorite;
    await this.cardFetcherRepository.save(card);
  }

  async remove(id: number): Promise<void> {
    await this.cardFetcherRepository.delete(id);
  }
}