import express, { json, Request, Response } from 'express';
import productRoutes from './components/product-catalog/routes/product-routes';
import errorHandler from './middlewares/error-handler';

const app = express();
app.use(json());

app.get('/', (req: Request, res: Response) => {
    res.send('ecommerce api');
});

/**
 * Use the product routes for handling requests to the /products endpoint.
 *
 * This middleware will route all requests starting with /products to the
 * productRoutes router, which defines the specific routes and handlers
 * for product-related operations.
 */
app.use('/products', productRoutes);

/**
 * Error handling middleware.
 *
 * This middleware will catch any errors that occur during the processing
 * of requests and send a standardized error response.
 */
app.use(errorHandler);

export default app;