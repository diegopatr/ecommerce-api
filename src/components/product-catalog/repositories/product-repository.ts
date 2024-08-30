import Product from "../models/product-model";

export default class ProductRepository {
    private static products: Product[] = [
        {id: 1, name: "Product 1", price: 100},
        {id: 2, name: "Product 2", price: 200},
        {id: 3, name: "Product 3", price: 300},
    ];

    private nextId: number = 4;

    getAll(): Product[] {
        return ProductRepository.products;
    }

    getById(id: number): Product | undefined {
        return ProductRepository.products.find(product => product.id === id);
    }

    create(product: Omit<Product, 'id'>): Product {
        const newProduct: Product = {...product, id: this.nextId++};
        ProductRepository.products.push(newProduct);
        return newProduct;
    }

    replace(id: number, product: Omit<Product, 'id'>): Product | undefined {
        const index = ProductRepository.products.findIndex(p => p.id === id);
        if (index === -1) {
            return undefined;
        }
        const updatedProduct: Product = {...product, id};
        ProductRepository.products[index] = updatedProduct;
        return updatedProduct;
    }

    update(id: number, product: Partial<Omit<Product, 'id'>>): Product | undefined {
        const index = ProductRepository.products.findIndex(p => p.id === id);
        if (index === -1) {
            return undefined;
        }
        const foundProduct = ProductRepository.products[index];
        const updatedProduct: Product = {...foundProduct, ...product, id};
        ProductRepository.products[index] = updatedProduct;
        return updatedProduct;
    }

    delete(id: number): boolean {
        const index = ProductRepository.products.findIndex(p => p.id === id);
        if (index === -1) {
            return false;
        }
        ProductRepository.products.splice(index, 1);
        return true;
    }
}