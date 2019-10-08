/**
 * An order for pizza!
 *
 * @property {string} orderId - the order unique ID
 * @property {pizzaType} pizzaType - the type of the Pizzas
 * @property {pizzaSize} pizzaSize - the size of the Pizzas
 * @property {Number} [quantity = 1] - how many pizzas
 * @property {Number} [discount = 0] - order discount
 * @property {Date} [acceptedAt] - when was the order accepted
 * @property {Date} [preparedAt] - when was the order prepared
 * @property {Date} [deliveredAt] - when was the order delivered to the customer
 */
class Order {
  constructor(details = {}) {
    this.quantity = 1;
    Object.assign(this, details);
  }
}

export default Order;
