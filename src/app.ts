import express, {json, Request, Response} from 'express';

// product type

type Product = {
    id: number;
    name: string;
    price: number;
}


let products: Product[] = [
    {id: 1, name: "Product 1", price: 100},
    {id: 2, name: "Product 2", price: 200},
    {id: 3, name: "Product 3", price: 300},
];


let nextId: number = 4;

// ecommerce express app

const app = express();
const port: number = 3000;

app.use(json())

// ecommerce api - home route

app.get('/', (req: Request, res: Response) => {
    res.send('ecommerce api - v0.1.0');
});

// ecommerce api - product routes

app.get("/products", (req: Request, res: Response) => {
    res.status(200).json(products);
});

app.post("/products", (req: Request, res: Response) => {
    const newProduct: Product = {...req.body, id: nextId++};
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.get("/products/:id", (req: Request, res: Response) => {
    const product = products.find((product) => product.id === parseInt(req.params.id));
    if (!product) {
        res.status(404).send("Product not found");
    } else {
        res.status(200).json(product);
    }
});

app.delete("/products/:id", (req: Request, res: Response) => {
    const index = products.findIndex((product) => product.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).send("Product not found");
    } else {
        products.splice(index, 1);
        res.status(204).send();
    }
});

app.put("/products/:id", (req: Request, res: Response) => {
    const index = products.findIndex((product) => product.id === parseInt(req.params.id));
    if (index === -1) {
        // According to the HTTP specification (RFC 9110), the PUT method
        // is defined to create or replace the resource at the target URI
        // with the request payload. However, it is generally expected to
        // update an existing resource. If the resource does not exist,
        // it should not create a new one with a different ID, as this
        // would violate the idempotent nature of PUT requests. Instead,
        // it should return a 404 Not Found status to indicate that the
        // resource to be updated does not exist.
        res.status(404).send("Product not found");
    } else {
        const updatedProduct: Product = {...req.body, id: products[index].id};
        products[index] = updatedProduct;
        res.status(200).json(updatedProduct);
    }
});

app.patch("/products/:id", (req: Request, res: Response) => {
    const index = products.findIndex((product) => product.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).send("Product not found");
    } else {
        const updatedProduct: Product = {...products[index], ...req.body, id: products[index].id};
        products[index] = updatedProduct;
        res.status(200).json(updatedProduct);
    }
});

// start the server

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});