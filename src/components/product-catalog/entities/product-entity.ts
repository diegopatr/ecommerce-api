import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {BrandEntity} from "./brand-entity";
import {CategoryEntity} from "./category-entity";

@Entity({name: 'product'})
class ProductEntity {
    @PrimaryGeneratedColumn({name: 'product_id'})
    id!: number;

    @Column({name:'product_name', type: 'varchar', length: 255, nullable: false})
    name!: string;

    @Column({name:'product_description', type: 'text'})
    description!: string;

    @Column({name:'product_price', type: 'numeric', precision: 10, scale: 2})
    price!: number;

    @ManyToOne(() => CategoryEntity)
    @JoinColumn({name: 'category_id'})
    category!: CategoryEntity;

    @ManyToOne(() => BrandEntity)
    @JoinColumn({name: 'brand_id'})
    brand!: BrandEntity;
}

export default ProductEntity;