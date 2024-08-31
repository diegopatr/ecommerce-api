import Product from "../models/product-model";
import database from "../../../config/database";
import ProductRepository from "./product-repository";

class ProductRepositorySql implements ProductRepository {
    async getAll(): Promise<Product[]> {
        const result = await database.query('SELECT * FROM product');
        return result.rows;
    }

    async getById(id: number): Promise<Product | undefined> {
        const result = await database.query('SELECT * FROM product WHERE product_id = $1', [id]);
        if (result.rows.length === 0) {
            return undefined;
        }
        return result.rows[0];
    }

    async create(product: Omit<Product, 'product_id'>): Promise<Product> {
        const result = await database.query(
            'INSERT INTO product (product_name, product_description, product_price, category_id, brand_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [product.product_name, product.product_description, product.product_price, product.category_id, product.brand_id]
        );
        return result.rows[0];
    }

    async replace(id: number, product: Omit<Product, 'product_id'>): Promise<Product | undefined> {
        const result = await database.query(
            'UPDATE product SET product_name = $1, product_description = $2, product_price = $3, category_id = $4, brand_id = $5 WHERE product_id = $6 RETURNING *',
            [product.product_name, product.product_description, product.product_price, product.category_id, product.brand_id, id]
        );
        return result.rows[0];
    }

    async update(id: number, product: Partial<Omit<Product, 'product_id'>>): Promise<Product | undefined> {
        const fields: string[] = [];
        const values = [];
        let query = 'UPDATE product SET ';

        Object.keys(product).forEach((key, index) => {
            fields.push(`${key} = $${index + 1}`);
            values.push((product as any)[key]);
        });

        query += fields.join(', ') + ' WHERE product_id = $' + (fields.length + 1) + ' RETURNING *';
        values.push(id);

        const result = await database.query(query, values);
        return result.rows[0];
    }

    async delete(id: number): Promise<boolean> {
        const result = await database.query('DELETE FROM product WHERE product_id = $1', [id]);
        return result.rowCount !== null && result.rowCount > 0;
    }
}

export default ProductRepositorySql;