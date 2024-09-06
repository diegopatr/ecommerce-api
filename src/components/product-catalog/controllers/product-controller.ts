import {Request, Response} from 'express';

import ProductRepository from '../repositories/product-repository';
import ProductRepositoryTypeorm from "../repositories/product-repository-typeorm";
import {datasource} from "../../../config/datasource";

export class ProductController {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepositoryTypeorm(datasource);
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        const products = await this.productRepository.getAll();
        res.status(200).json(products);
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        const product = await this.productRepository.getById(parseInt(req.params.id));
        if (!product) {
            res.status(404).send('Product not found');
        } else {
            res.status(200).json(product);
        }
    };

    create = async (req: Request, res: Response): Promise<void> => {
        const newProduct = await this.productRepository.create(req.body);
        res.status(201).json(newProduct);
    };

    replace = async (req: Request, res: Response): Promise<void> => {
        const updatedProduct = await this.productRepository.replace(parseInt(req.params.id), req.body);
        if (!updatedProduct) {
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
            res.status(200).json(updatedProduct);
        }
    };

    update = async (req: Request, res: Response): Promise<void> => {
        const updatedProduct = await this.productRepository.update(parseInt(req.params.id), req.body);
        if (!updatedProduct) {
            res.status(404).send('Product not found');
        } else {
            res.status(200).json(updatedProduct);
        }
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        const success = await this.productRepository.delete(parseInt(req.params.id));
        if (!success) {
            res.status(404).send('Product not found');
        } else {
            res.status(204).send();
        }
    };
}