import { Cards } from './../cards/cards.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('extensions')
export class Extensions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null })
    code: string;

    @Column({ default: null })
    extensionName: string;

    @OneToMany(() => Cards, card => card.extension)
    cards: Cards[];
}