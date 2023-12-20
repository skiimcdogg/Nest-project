import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CardRarity } from './enums/card-rarity.enum';

@Entity('cards')
export class CardFetcher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null })
    name: string;

    @Column({ default: null })
    manaCost: string;

    @Column({ type: 'json', default: null })
    colorIdentity: string[];

    @Column({ default: null })
    type: string;

    @Column({
      type: 'enum',
      enum: CardRarity,
      default: null,
      readonly: true
    })
    rarity: CardRarity;

    @Column({ default: null })
    setName: string;

    @Column({ type: 'longtext', default: null })
    text: string;

    @Column({ default: null })
    flavor: string;

    @Column({ default: null })
    power: string;

    @Column({ default: null })
    toughness: string;

    @Column({ default: null })
    imageUrl: string;

    @Column({
        type: 'tinyint',
        width: 1,
        default: 0,
      })
      isFavorite: boolean;
}