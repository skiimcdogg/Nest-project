import { CardFetcher } from './../card-fetcher/card-fetcher.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('extensions')
export class Extensions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null })
    code: string;

    @Column({ default: null })
    extensionName: string;

    @OneToMany(() => CardFetcher, card => card.extension)
    cards: CardFetcher[];
}