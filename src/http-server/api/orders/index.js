import Router from 'koa-router';
import create from './create';

const router = Router();

/**
 * @api {post} /api/orders Place an order
 * @apiDescription Creates an order for pizzas!
 * @apiVersion 1.0.0
 * @apiName CreateOrder
 * @apiGroup Orders
 *
 * @apiParam  {String} pizzaType The pizza type
 * @apiParam  {String} pizzaSize The pizza size
 * @apiParam  {String} quantity How many pizzas
 *
 * @apiSuccess {Object} response
 * @apiSuccess {Object} response.order The placed order
 * @apiSuccess {String} response.price The price of the order
 * @apiSuccess {String} response.etaInMinutes The estimated time of arrival in minutes
 *
 * @apiError (UnprocessableEntity 422) {Object} ValidationError Invalid request body
 * @apiError (ServerError 500) ServerError  Internal server error
 */
router.post('orders.create', 'orders', create);

export default router;
