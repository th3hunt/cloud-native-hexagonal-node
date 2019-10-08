import pino from 'pino';

export default pino({
  enabled: process.env.NODE_ENV !== 'test'
});
