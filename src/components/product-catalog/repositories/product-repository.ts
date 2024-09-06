import Product from '../entities/product-entity';

interface ProductRepository {
    getAll(): Promise<Product[]>;

    getById(id: number): Promise<Product | undefined>;

    create(product: Omit<Product, 'id'>): Promise<Product>;

    replace(id: number, product: Omit<Product, 'id'>): Promise<Product | undefined>;

    update(id: number, product: Partial<Omit<Product, 'id'>>): Promise<Product | undefined>;

    delete(id: number): Promise<boolean>;
}

export default ProductRepository;