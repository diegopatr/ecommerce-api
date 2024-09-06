import database from '../../../config/database';
import Product from '../entities/product-entity';
import ProductRepository from './product-repository';

class ProductRepositorySql implements ProductRepository {
    async getAll(): Promise<Product[]> {
        const result = await database.query('SELECT * FROM product');
        return result.rows.map(row => ({
            id: row.product_id,
            name: row.product_name,
            description: row.product_description,
            price: row.product_price
        }));
    }

    async getById(id: number): Promise<Product | undefined> {
        const result = await database.query('SELECT * FROM product WHERE product_id = $1', [id]);
        if (result.rows.length === 0) {
            return undefined;
        }
        const row = result.rows[0];
        return {
            id: row.product_id,
            name: row.product_name,
            description: row.product_description,
            price: row.product_price
        };
    }

    async create(product: Omit<Product, 'id'>): Promise<Product> {
        const result = await database.query(
            'INSERT INTO product (product_name, product_description, product_price) VALUES ($1, $2, $3) RETURNING *',
            [product.name, product.description, product.price]
        );
        const row = result.rows[0];
        return {
            id: row.product_id,
            name: row.product_name,
            description: row.product_description,
            price: row.product_price
        };
    }

    async replace(id: number, product: Omit<Product, 'product_id'>): Promise<Product | undefined> {
        const result = await database.query(
            'UPDATE product SET product_name = $1, product_description = $2, product_price = $3 WHERE product_id = $4 RETURNING *',
            [product.name, product.description, product.price, id]
        );
        const row = result.rows[0];
        return {
            id: row.product_id,
            name: row.product_name,
            description: row.product_description,
            price: row.product_price
        };
    }

    async update(id: number, product: Partial<Omit<Product, 'id'>>): Promise<Product | undefined> {
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
        const row = result.rows[0];
        return {
            id: row.product_id,
            name: row.product_name,
            description: row.product_description,
            price: row.product_price
        };
    }

    async delete(id: number): Promise<boolean> {
        const result = await database.query('DELETE FROM product WHERE product_id = $1', [id]);
        return result.rowCount !== null && result.rowCount > 0;
    }
}

export default ProductRepositorySql;