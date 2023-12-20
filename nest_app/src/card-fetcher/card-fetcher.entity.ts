import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

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

    @Column({ default: null })
    rarity: string;

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
      favorite: boolean;

}