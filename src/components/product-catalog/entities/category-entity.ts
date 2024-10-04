import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn} from 'typeorm';

@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn({ name: 'category_id' })
    id!: number;

    @Column({ name: 'category_name', type: 'varchar', length: 255, nullable: false })
    name!: string;

    @Column({ name: 'category_description', type: 'text', nullable: true })
    description!: string;

    @Column({ name: 'category_image', type: 'text', nullable: true })
    image!: string;
    
    
    @ManyToOne(() => CategoryEntity, category => category.children, {eager: true, nullable: true})
    @JoinColumn({ name: 'parent_category_id' })
    parentCategory!: CategoryEntity | null;

    @OneToMany(() => CategoryEntity, category => category.parentCategory)
    @JoinColumn({ name: 'parent_category_id' })
    children!: CategoryEntity[];
}