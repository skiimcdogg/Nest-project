import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('extensions')
export class Extensions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null })
    code: string;

    @Column({ default: null })
    setName: string;

}