import {Hono} from 'hono'
import { zValidator } from '@hono/zod-validator';
import {ordersController, oneOrderController, addOrderController, updateOrderController, deleteOrderController} from './orders.controller'
import {orderSchema} from '../validator'

export const ordersRouter = new Hono();

ordersRouter.get('orders', ordersController);

//one order
ordersRouter.get("/orders/:id", oneOrderController)

//add order

ordersRouter.post("orders", zValidator('json', orderSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addOrderController)

//update a order
ordersRouter.put("/orders/:id", updateOrderController)

ordersRouter.delete("/orders/:id", deleteOrderController)

export default ordersRouter;