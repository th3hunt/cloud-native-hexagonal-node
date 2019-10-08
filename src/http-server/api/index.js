import Router from 'koa-router';
import orders from './orders';

const router = Router();

router.use('/api/orders', orders.routes(), orders.allowedMethods());

export default router;
