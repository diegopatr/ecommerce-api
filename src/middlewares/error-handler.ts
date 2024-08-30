import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    logger.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandler;