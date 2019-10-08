import 'dotenv/config';
import logger from 'logger';

logger.info(process.env.WELCOME_MESSAGE || 'Hello from Cloud Native Hexagonal!');
