import { DataSource, Repository } from 'typeorm';
import ProductEntity from '../entities/product-entity';

class ProductRepository implements ProductRepository {
    private repository: Repository<ProductEntity>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(ProductEntity);
    }

    async getAll(): Promise<ProductEntity[]> {
        return this.repository.find();
    }

    async getById(id: number): Promise<ProductEntity | undefined> {
        const product = await this.repository.findOneBy({ id });
        return product || undefined;
    }

    async create(product: Omit<ProductEntity, 'id'>): Promise<ProductEntity> {
        const newProduct = this.repository.create(product);
        return this.repository.save(newProduct);
    }

    async replace(id: number, product: Omit<ProductEntity, 'id'>): Promise<ProductEntity | undefined> {
        await this.repository.update(id, product);
        return this.getById(id);
    }

    async update(id: number, product: Partial<Omit<ProductEntity, 'id'>>): Promise<ProductEntity | undefined> {
        await this.repository.update(id, product);
        return this.getById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result?.affected ? result.affected > 0 : false;
    }
}

export default ProductRepository;