import {DataSource} from 'typeorm';
import ProductEntity from '../components/product-catalog/entities/product-entity';
import {CategoryEntity} from "../components/product-catalog/entities/category-entity";
import {BrandEntity} from "../components/product-catalog/entities/brand-entity";

export const datasource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [ProductEntity, CategoryEntity, BrandEntity],
    synchronize: false,
    logging: 'all'
});