import uuid from 'uuid/v1';
import Order from '../order';
import orderRepo from '../repository';
import getPrice from '../getPrice';
import getEta from '../getEta';

/**
 * The CreateOrderHandler handler.
 *
 * Responsible... well for creating an order
 */
export default class CreateOrderHandler {
  /**
   * Create a new CreateOrderHandler
   *
   * @param {object} params
   * @param {EventEmitter} params.eventBus - the bus to emit any events on
   */
  constructor({eventBus} = {}) {
    this.eventBus = eventBus;
  }

  /**
   * Handle a CreateOrderCommand
   *
   * @async
   * @param {CreateOrderCommand} command - the command to handle
   * @returns {Promise<OrderReceipt>} - a promise that resolves with an OrderReceipt
   */
  async handle(command) {
    command.validate();

    const order = new Order();

    order.orderUUID = uuid();
    order.pizzaType = command.pizzaType;
    order.pizzaSize = command.pizzaSize;
    order.askedQuantity = command.quantity;
    order.acceptedAt = Date.now();

    order.totalQuantity = command.quantity >= 2 ? command.quantity + 1 : command.quantity;
    order.freeSoda = command.quantity > 4;

    await orderRepo.createOrder(order);

    const orderReceipt = {
      order,
      price: getPrice(),
      etaInMinutes: getEta()
    };

    this.eventBus.emit('OrderCreated', {receipt: orderReceipt});

    return orderReceipt;
  }
}

/**
 * @typedef {Object} OrderReceipt
 * @property {Order} order - the order
 * @property {Number} price - the price for that order
 * @property {Number} etaInMinutes - the ETA in minutes for the order to be delivered
 */
