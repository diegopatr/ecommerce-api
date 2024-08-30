import dotenv from 'dotenv';
import app from './app';
import logger from './utils/logger';

// Load environment variables from .env file
dotenv.config();

const port: number = parseInt(process.env.PORT || '3000', 10);

app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
});