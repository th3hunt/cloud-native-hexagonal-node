const EventEmitter = require('events');
const amqp = require('amqplib');

const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'localhost';
const RABBITMQ_PORT = process.env.RABBITMQ_PORT || 5672;
const RABBITMQ_USER = process.env.RABBITMQ_USER || 'devuser';
const RABBITMQ_PASS = process.env.RABBITMQ_PASS || 'devpass';
const RABBITMQ_VHOST = process.env.RABBITMQ_VHOST || '/';

/**
 * A BrokkerConnector for RabbitMQ
 *
 * {@see BrokerConnector}
 */
class RabbitConnector extends EventEmitter {
  constructor() {
    super();
    this.conn = null;
    this.onClose = this.onClose.bind(this);
    this.onError = this.onError.bind(this);
  }

  get connection() {
    return this.conn ? Promise.resolve(this.conn) : this.connect();
  }

  async connect() {
    const conn = await amqp.connect({
      protocol: 'amqp',
      hostname: RABBITMQ_HOST,
      port: Number(RABBITMQ_PORT),
      username: RABBITMQ_USER,
      password: RABBITMQ_PASS,
      vhost: RABBITMQ_VHOST
    });

    conn.on('error', this.onError);
    conn.on('close', this.onClose);

    this.conn = conn;
    this.emit('connect', conn);

    return conn;
  }

  disconnect() {
    return new Promise(resolve => {
      if (!this.conn) {
        resolve();
      }
      this.conn.off('close', this.onClose);
      this.conn.close().then(() => {
        this.emit('close', this.conn);
        this.conn = null;
        resolve();
      });
    });
  }

  reconnect() {
    this.emit('reconnect');
    setTimeout(() => this.connect(), 500);
  }

  onClose() {
    this.emit('close', this.conn);
    this.conn = null;
    this.reconnect();
  }

  onError(err) {
    this.emit('error', err);
    this.conn = null;
    if (err.message !== 'Connection closing') {
      this.reconnect();
    }
  }
}

module.exports = new RabbitConnector();

/**
 * A BrokerConnector provides a persistent connection
 * to a message broker with reconnect on failure guarantees.
 *
 * @typedef {Object} BrokerConnector
 * @property {Promise<object>} connection - the connection as an object, will connect first if not already connected
 * @property {function():Promise<object>} connect - create a new connection
 */
