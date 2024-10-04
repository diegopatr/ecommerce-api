import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('brand')
export class BrandEntity {
    @PrimaryGeneratedColumn({ name: 'brand_id' })
    id!: number;

    @Column({ name: 'brand_name', type: 'varchar', length: 255, nullable: false })
    name!: string;

    @Column({ name: 'brand_description', type: 'text', nullable: true })
    description!: string;
}