import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cards } from './cards.entity';

@Injectable()
export class CardFetcherService {
  constructor(
    @InjectRepository(Cards)
    private cardFetcherRepository: Repository<Cards>,
  ) {}

  findAll(): Promise<Cards[]> {
    return this.cardFetcherRepository.find();
  }

  findAllFavorites(): Promise<Cards[]> {
    return this.cardFetcherRepository.findBy({ isFavorite: true })
  }

  findManyWithExtensionName(setExtensionName: string): Promise<Cards[]> {
    return this.cardFetcherRepository.find({ where: {
      extensionName: setExtensionName
    },
  })
  }

  async findOne(id: number): Promise<Cards> {
    const card = await this.cardFetcherRepository.findOneBy({ id });
    if(!card) {
      throw new NotFoundException(`Card with ID ${id} not found.`)
    }
    return card
  }

  async toggleFavoriteStatus(id: number): Promise<Cards> {
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