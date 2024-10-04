import {Request, Response} from 'express';
import {Repository} from 'typeorm';
import ProductEntity from "../entities/product-entity";
import {datasource} from "../../../config/datasource";

export class ProductController {
    private productRepository: Repository<ProductEntity>;

    constructor() {
        this.productRepository = datasource.getRepository(ProductEntity);
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        const products = await this.productRepository.find();
        res.status(200).json(products);
    };

    getAllPaged = async (req: Request, res: Response): Promise<void> => {
        const skip = parseInt(req.query.skip as string) || 0;
        const take = parseInt(req.query.take as string) || 10;
        const products = await this.productRepository.find({
            skip,
            take
        });
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        const product = await this.productRepository.findOne({
            where: {id: parseInt(req.params.id)},
            relations: ['category', 'brand']
        });
        if (!product) {
            res.status(404).send('Product not found');
        } else {
            res.status(200).json(product);
        }
    };

    create = async (req: Request, res: Response): Promise<void> => {
        const newProduct = this.productRepository.create(req.body);
        res.status(201).json(newProduct);
    };

    replace = async (req: Request, res: Response): Promise<void> => {
        const productId = parseInt(req.params.id);
        const existingProduct = await this.productRepository.findOneBy({id: productId});

        if (!existingProduct) {
            // According to the HTTP specification (RFC 9110), the PUT method
            // is defined to create or replace the resource at the target URI
            // with the request payload. However, it is generally expected to
            // update an existing resource. If the resource does not exist,
            // it should not create a new one with a different ID, as this
            // would violate the idempotent nature of PUT requests. Instead,
            // it should return a 404 Not Found status to indicate that the
            // resource to be updated does not exist.
            res.status(404).send('Product not found');
        } else {
            const updatedProduct = this.productRepository.create({...existingProduct, ...req.body});
            await this.productRepository.save(updatedProduct);
            res.status(200).json(updatedProduct);
        }
    };

    update = async (req: Request, res: Response): Promise<void> => {
        const productId = parseInt(req.params.id);
        const partialUpdate = req.body;

        const result = await this.productRepository.update(productId, partialUpdate);
        if (result.affected === 0) {
            res.status(404).send('Product not found');
        } else {
            const updatedProduct = await this.productRepository.findOneBy({id: productId});
            res.status(200).json(updatedProduct);
        }
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        const result = await this.productRepository.delete(parseInt(req.params.id));
        if (result.affected === 0) {
            res.status(404).send('Product not found');
        } else {
            res.status(204).send();
        }
    };
}