/* eslint-disable global-require */
import logger from 'logger';
import CreateOrderCommand from 'domain/orders/create/command';

const inputQueue = 'hexagonal.input';

class Broker {
  constructor(rabbit, commandBus) {
    this.rabbit = rabbit;
    this.commandBus = commandBus;
  }

  async start() {
    this.conn = await this.rabbit.connection;
    this.channel = await this.conn.createChannel();
    this.channel.assertQueue(inputQueue, {durable: true});
    this.channel.consume(inputQueue, this.consumeMessage.bind(this));
  }

  async consumeMessage(msg) {
    let response;
    let command;

    try {
      const payload = JSON.parse(msg.content.toString());
      const {commandType, commandBody} = payload;
      switch (commandType) {
        case 'CreateOrder':
          command = CreateOrderCommand.buildFromJSON(commandBody);
          break;
        default:
          throw new Error('Unknown commandType');
      }
      response = this.commandBus.execute(command);
    } catch (error) {
      logger.error(error.message);
      response = error.message;
      this.channel.nack(msg);
      return;
    }

    if (msg.properties.replyTo) {
      const replyOpts = {
        correlationId: msg.properties.correlationId
      };
      this.channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(JSON.stringify(response)),
        replyOpts
      );
    }

    this.channel.ack(msg);
  }
}

module.exports = Broker;
