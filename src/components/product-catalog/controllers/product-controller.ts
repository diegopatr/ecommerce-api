import {Request, Response} from 'express';

import ProductRepository from "../repositories/product-repository";

export class ProductController {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    getAll = (req: Request, res: Response): void => {
        const products = this.productRepository.getAll();
        res.status(200).json(products);
    };

    getById = (req: Request, res: Response): void => {
        const product = this.productRepository.getById(parseInt(req.params.id));
        if (!product) {
            res.status(404).send('Product not found');
        } else {
            res.status(200).json(product);
        }
    };

    create = (req: Request, res: Response): void => {
        const newProduct = this.productRepository.create(req.body);
        res.status(201).json(newProduct);
    };

    replace = (req: Request, res: Response): void => {
        const updatedProduct = this.productRepository.replace(parseInt(req.params.id), req.body);
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

    update = (req: Request, res: Response): void => {
        const updatedProduct = this.productRepository.update(parseInt(req.params.id), req.body);
        if (!updatedProduct) {
            res.status(404).send('Product not found');
        } else {
            res.status(200).json(updatedProduct);
        }
    };

    delete = (req: Request, res: Response): void => {
        const success = this.productRepository.delete(parseInt(req.params.id));
        if (!success) {
            res.status(404).send('Product not found');
        } else {
            res.status(204).send();
        }
    };
}