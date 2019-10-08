import Koa from 'koa';
import http from 'http';
import Boom from 'boom';
import pino from 'koa-pino-logger';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import errorHandler from './middleware/errorHandler';
import health from './health';
import api from './api';

const inProduction = process.env.NODE_ENV === 'production';

export default function createServer({commandBus} = {}) {
  if (!commandBus) {
    throw new Error('server: commandBus is missing');
  }

  const app = new Koa();

  Object.assign(app.context, {commandBus});

  // setup logging
  app.use(pino());

  // setup helmet
  if (inProduction) {
    app.use(helmet());
  }

  // handle errors
  app.use(errorHandler);

  // parse application/json
  app.use(
    bodyParser({
      enableTypes: ['json'],
      onerror: err => {
        throw Boom.badRequest(err);
      }
    })
  );

  // register routes
  app.use(health.routes(), health.allowedMethods());
  app.use(api.routes());
  app.use(
    api.allowedMethods({
      throw: true,
      notImplemented: () => Boom.notImplemented(),
      methodNotAllowed: () => Boom.methodNotAllowed()
    })
  );

  return http.createServer(app.callback());
}
