/* eslint-disable import/prefer-default-export */

/**
 * An error designating that something is wrong
 * with creating an order.
 */
export class CreateOrderError extends Error {
  constructor(createOrderCommand, errors, ...params) {
    super(...params);
    this.name = 'CreateOrderError';
    this.command = createOrderCommand;
    this.errors = errors;
    this.date = new Date();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CreateOrderError);
    }
  }
}
