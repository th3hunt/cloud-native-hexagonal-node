import 'dotenv/config';

import program from 'commander';
import EventEmitter from 'events';
import CommandBus from 'domain/commandBus';
import Registry from 'domain/registry';
import CreateOrderCommand from 'domain/orders/create/command';

const registry = new Registry({
  eventBus: new EventEmitter()
});
const commandBus = new CommandBus({registry});

program
  .command('createOrder', 'Place a Pizza order!')
  .option('-t, --pizza-type <type>', 'the pizza type', 'custom')
  .option('-s, --pizza-size <size>', 'the pizza size', 'preview')
  .option('-q, --quantity <quantity>', 'how many pizzas')
  .action(async cmd => {
    const createOrder = CreateOrderCommand.buildFromJSON({
      pizzaType: cmd.pizzaType,
      pizzaSize: cmd.pizzaSize,
      quantity: cmd.quantity
    });
    await commandBus.execute(createOrder);
  });

program.parse(process.argv);
