//
// Hexagonal Node (composition root)
//

import 'dotenv/config';
import logger from 'logger';

import EventEmitter from 'events';
import createHttpServer from './http-server';
import CommandBus from './domain/commandBus';
import Registry from './domain/registry';

const NODE_ENV = process.env.NODE_ENV || 'development';

// CommandBus
const commandBus = new CommandBus({
  registry: new Registry({
    eventBus: new EventEmitter()
  })
});

async function terminate() {
  // shut down adapters one by one
  process.exit(1);
}

logger.info('Launching service in %s mode...', NODE_ENV);

// HTTP server
const port = process.env.HTTP_PORT || 3000;
const server = createHttpServer({commandBus});
server.listen(port);
server.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
      logger.error(`Port ${port} requires elevated privileges`);
      terminate();
      break;
    case 'EADDRINUSE':
      logger.error(`Port ${port} is already in use`);
      terminate();
      break;
    default:
      throw error;
  }
});
server.on('listening', () => {
  logger.info(`HTTP server listening at http://127.0.0.1:${port}`);
});

// Process termination
['SIGTERM', 'SIGINT', 'SIGUSR2'].forEach(signal => {
  process.once(signal, () => {
    logger.error('Received %s - terminating process...', signal);
    terminate();
  });
});

process.on('exit', () => logger.info('Process terminated'));
