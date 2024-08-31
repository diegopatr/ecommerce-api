import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import logger from './utils/logger';

const port: number = parseInt(process.env.PORT || '3000', 10);

app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
});