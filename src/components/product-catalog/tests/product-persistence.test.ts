import {DataSource, Repository} from 'typeorm';
import ProductEntity from "../entities/product-entity";

describe('Product Persistence with TypeORM', () => {
    let dataSource: DataSource;
    let productRepository: Repository<ProductEntity>;
    let mockProduct: Omit<ProductEntity, 'id'>;

    beforeAll(async () => {
        dataSource = new DataSource({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [ProductEntity],
            synchronize: true,
        });
        await dataSource.initialize();
        productRepository = dataSource.getRepository(ProductEntity);
        mockProduct = {
            name: 'Laptop Y',
            description: 'High performance Laptop Y',
            price: 1299.99,
        };
    });

    afterAll(async () => {
        await dataSource.destroy();
    });

    it('should create a new product', async () => {
        const createdProduct = await productRepository.save(mockProduct);
        expect(createdProduct).toHaveProperty('id');
        expect(createdProduct.name).toBe(mockProduct.name);
    });

    it('should retrieve a product by ID', async () => {
        const createdProduct = await productRepository.save(mockProduct);
        const retrievedProduct = await productRepository.findOneBy({id: createdProduct.id});
        expect(retrievedProduct).toBeDefined();
        expect(retrievedProduct?.name).toBe(mockProduct.name);
    });

    it('should update a product', async () => {
        const createdProduct = await productRepository.save(mockProduct);
        const updatedProductData = {name: 'Updated Product'};
        await productRepository.update(createdProduct.id, updatedProductData);
        const updatedProduct = await productRepository.findOneBy({id: createdProduct.id});
        expect(updatedProduct).toBeDefined();
        expect(updatedProduct?.name).toBe(updatedProductData.name);
    });

    it('should delete a product', async () => {
        const createdProduct = await productRepository.save(mockProduct);
        await productRepository.delete(createdProduct.id);
        const retrievedProduct = await productRepository.findOneBy({id: createdProduct.id});
        expect(retrievedProduct).toBeNull();
    });
});