import Product from '../entities/product-entity';
import ProductRepository from './product-repository';

class ProductRepositoryMemory implements ProductRepository {
    private static products: Product[] = [
        {
            id: 1,
            name: 'Smartphone X',
            description: 'Latest model of Smartphone X',
            price: 999.99,
        },
        {
            id: 2,
            name: 'Laptop Y',
            description: 'High performance Laptop Y',
            price: 1299.99,
        },
        {
            id: 3,
            name: 'Washing Machine Z',
            description: 'Efficient Washing Machine Z',
            price: 499.99,
        }
    ];

    private nextId: number = 4;

    async getAll(): Promise<Product[]> {
        return ProductRepositoryMemory.products;
    }

    async getById(id: number): Promise<Product | undefined> {
        return ProductRepositoryMemory.products.find(product => product.id === id);
    }

    async create(product: Omit<Product, 'product_id'>): Promise<Product> {
        const newProduct: Product = {...product, id: this.nextId++};
        ProductRepositoryMemory.products.push(newProduct);
        return newProduct;
    }

    async replace(id: number, product: Omit<Product, 'id'>): Promise<Product | undefined> {
        const index = ProductRepositoryMemory.products.findIndex(p => p.id === id);
        if (index === -1) {
            return undefined;
        }
        const updatedProduct: Product = {...product, id: id};
        ProductRepositoryMemory.products[index] = updatedProduct;
        return updatedProduct;
    }

    async update(id: number, product: Partial<Omit<Product, 'id'>>): Promise<Product | undefined> {
        const index = ProductRepositoryMemory.products.findIndex(p => p.id === id);
        if (index === -1) {
            return undefined;
        }
        const foundProduct = ProductRepositoryMemory.products[index];
        const updatedProduct: Product = {...foundProduct, ...product, id: id};
        ProductRepositoryMemory.products[index] = updatedProduct;
        return updatedProduct;
    }

    async delete(id: number): Promise<boolean> {
        const index = ProductRepositoryMemory.products.findIndex(p => p.id === id);
        if (index === -1) {
            return false;
        }
        ProductRepositoryMemory.products.splice(index, 1);
        return true;
    }
}

export default ProductRepositoryMemory;