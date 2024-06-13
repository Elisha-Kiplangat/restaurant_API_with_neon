import {Hono} from 'hono'
import { zValidator } from '@hono/zod-validator';
import { ordersController, oneOrderController, orderWithOrderMenuItemController,  addOrderController, updateOrderController, deleteOrderController} from './orders.controller'
import {orderSchema} from '../validator'
import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";

export const ordersRouter = new Hono();

ordersRouter.get('orders', adminRoleAuth, ordersController);

//one order
ordersRouter.get("/orders/:id", adminRoleAuth, oneOrderController)

//add order

ordersRouter.post("orders", zValidator('json', orderSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addOrderController)

//update a order
ordersRouter.put("/orders/:id", updateOrderController)

ordersRouter.delete("/orders/:id", adminRoleAuth, deleteOrderController)

ordersRouter.get("/order-details/:id", adminRoleAuth, orderWithOrderMenuItemController)

export default ordersRouter;