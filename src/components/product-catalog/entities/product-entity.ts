import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

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
}

export default ProductEntity;