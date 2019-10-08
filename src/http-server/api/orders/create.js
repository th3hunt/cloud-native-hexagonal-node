import Boom from 'boom';
import CreateOrderCommand from 'domain/orders/create/command';

export default async function createOrder(ctx) {
  const {request} = ctx;
  const command = CreateOrderCommand.buildFromJSON(request.body);
  try {
    const receipt = await ctx.commandBus.execute(command);
    ctx.body = {
      ...receipt
    };
  } catch (err) {
    if (err.errors) {
      throw Boom.badData('Invalid order', err.errors);
    } else {
      throw err;
    }
  }
}
