import Product from "../models/product-model";
import ProductRepository from "./product-repository";

class ProductRepositoryMemory implements ProductRepository {
    private static products: Product[] = [
        {
            product_id: 1,
            product_name: 'Smartphone X',
            product_description: 'Latest model of Smartphone X',
            product_price: 999.99,
            category_id: 3,
            brand_id: 1
        },
        {
            product_id: 2,
            product_name: 'Laptop Y',
            product_description: 'High performance Laptop Y',
            product_price: 1299.99,
            category_id: 1,
            brand_id: 2
        },
        {
            product_id: 3,
            product_name: 'Washing Machine Z',
            product_description: 'Efficient Washing Machine Z',
            product_price: 499.99,
            category_id: 2,
            brand_id: 3
        }
    ];

    private nextId: number = 4;

    async getAll(): Promise<Product[]> {
        return ProductRepositoryMemory.products;
    }

    async getById(id: number): Promise<Product | undefined> {
        return ProductRepositoryMemory.products.find(product => product.product_id === id);
    }

    async create(product: Omit<Product, 'product_id'>): Promise<Product> {
        const newProduct: Product = {...product, product_id: this.nextId++};
        ProductRepositoryMemory.products.push(newProduct);
        return newProduct;
    }

    async replace(id: number, product: Omit<Product, 'product_id'>): Promise<Product | undefined> {
        const index = ProductRepositoryMemory.products.findIndex(p => p.product_id === id);
        if (index === -1) {
            return undefined;
        }
        const updatedProduct: Product = {...product, product_id: id};
        ProductRepositoryMemory.products[index] = updatedProduct;
        return updatedProduct;
    }

    async update(id: number, product: Partial<Omit<Product, 'product_id'>>): Promise<Product | undefined> {
        const index = ProductRepositoryMemory.products.findIndex(p => p.product_id === id);
        if (index === -1) {
            return undefined;
        }
        const foundProduct = ProductRepositoryMemory.products[index];
        const updatedProduct: Product = {...foundProduct, ...product, product_id: id};
        ProductRepositoryMemory.products[index] = updatedProduct;
        return updatedProduct;
    }

    async delete(id: number): Promise<boolean> {
        const index = ProductRepositoryMemory.products.findIndex(p => p.product_id === id);
        if (index === -1) {
            return false;
        }
        ProductRepositoryMemory.products.splice(index, 1);
        return true;
    }
}

export default ProductRepositoryMemory;