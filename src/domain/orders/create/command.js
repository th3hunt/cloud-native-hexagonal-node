import * as constants from '../../constants';
import {CreateOrderError} from './error';

/**
 * The command for creating orders
 */
export default class CreateOrderCommand {
  /**
   * Validate this order
   *
   * @throws CreateOrderError - if the CreateOrder is invalid
   */
  validate() {
    const errors = [];

    // could we make this better?
    if (!Object.values(constants.pizzaType).includes(this.pizzaType)) {
      errors.push({field: 'pizzaType', message: 'Unknown pizza!'});
    }

    if (!Object.values(constants.pizzaSize).includes(this.pizzaSize)) {
      errors.push({field: 'pizzaSize', message: 'Strange size for a pizza!'});
    }

    if (this.quantity < 1) {
      errors.push({field: 'quantity', message: 'Too few pizzas!'});
    }

    if (this.quantity > 10) {
      errors.push({field: 'quantity', message: 'Too many pizzas!'});
    }

    if (errors.length > 0) {
      throw new CreateOrderError(this, errors, 'CreateOrder is not valid');
    }
  }

  /**
   * Build a CreateOrder out of the given JSON payload
   *
   * @param {object} json - the JSON to build from
   * @returns a new CreateOrder instance
   */
  static buildFromJSON({pizzaType, pizzaSize, quantity}) {
    const createOrder = new CreateOrderCommand();
    createOrder.pizzaType = pizzaType;
    createOrder.pizzaSize = pizzaSize;
    createOrder.quantity = quantity;
    return createOrder;
  }
}
