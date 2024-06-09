import { Hono } from 'hono'
import { orderStatusController, addOrderStatusController, oneOrderStatusController, updateOrderStatusController, deleteOrderStatusController } from './orderStatus.controller'
import { orderStatusSchema } from '../validator'
import { zValidator } from '@hono/zod-validator'


export const orderStatusRouter = new Hono();

orderStatusRouter.get('order-status', orderStatusController);

orderStatusRouter.get("/order-status/:id", oneOrderStatusController)

orderStatusRouter.post("order-status", zValidator('json', orderStatusSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addOrderStatusController)

orderStatusRouter.put("/order-status/:id", updateOrderStatusController)

orderStatusRouter.delete("/order-status/:id", deleteOrderStatusController)

export default orderStatusRouter;