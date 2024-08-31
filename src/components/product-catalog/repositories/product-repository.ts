import Product from '../models/product-model';

interface ProductRepository {
    getAll(): Promise<Product[]>;

    getById(id: number): Promise<Product | undefined>;

    create(product: Omit<Product, 'product_id'>): Promise<Product>;

    replace(id: number, product: Omit<Product, 'product_id'>): Promise<Product | undefined>;

    update(id: number, product: Partial<Omit<Product, 'product_id'>>): Promise<Product | undefined>;

    delete(id: number): Promise<boolean>;
}

export default ProductRepository;