import { Hono } from 'hono'
import { orderMenuItemController, addOrderMenuItemController, oneOrderMenuItemController, updateOrderMenuItemController, deleteOrderMenuItemController } from './orderMenuItem.controller'
import { orderMenuItemSchema } from '../validator'
import { zValidator } from '@hono/zod-validator'
import { adminRoleAuth, userRoleAuth, allRoleAuth } from "../middleware/bearAuth";


export const orderMenuItemRouter = new Hono();

orderMenuItemRouter.get('order-menu-items', adminRoleAuth, orderMenuItemController);

orderMenuItemRouter.get("/order-menu-items/:id", allRoleAuth, oneOrderMenuItemController)

orderMenuItemRouter.post("order-menu-items", adminRoleAuth, zValidator('json', orderMenuItemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addOrderMenuItemController)

orderMenuItemRouter.put("/order-menu-items/:id", adminRoleAuth, updateOrderMenuItemController)

orderMenuItemRouter.delete("/order-menu-items/:id", adminRoleAuth, deleteOrderMenuItemController)

export default orderMenuItemRouter;