import { Hono } from 'hono'
import { orderStatusController, addOrderStatusController, oneOrderStatusController, updateOrderStatusController, deleteOrderStatusController } from './orderStatus.controller'
import { orderStatusSchema } from '../validator'
import { zValidator } from '@hono/zod-validator'
import { adminRoleAuth, userRoleAuth, allRoleAuth } from "../middleware/bearAuth";


export const orderStatusRouter = new Hono();

orderStatusRouter.get('order-status', adminRoleAuth, orderStatusController);

orderStatusRouter.get("/order-status/:id", allRoleAuth, oneOrderStatusController)

orderStatusRouter.post("order-status", adminRoleAuth, zValidator('json', orderStatusSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addOrderStatusController)

orderStatusRouter.put("/order-status/:id", adminRoleAuth, updateOrderStatusController)

orderStatusRouter.delete("/order-status/:id", adminRoleAuth, deleteOrderStatusController)

export default orderStatusRouter;