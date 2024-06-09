import { Hono } from 'hono'
import { orderMenuItemController, addOrderMenuItemController, oneOrderMenuItemController, updateOrderMenuItemController, deleteOrderMenuItemController } from './orderMenuItem.controller'
import { orderMenuItemSchema } from '../validator'
import { zValidator } from '@hono/zod-validator'


export const orderMenuItemRouter = new Hono();

orderMenuItemRouter.get('order-menu-items', orderMenuItemController);

orderMenuItemRouter.get("/order-menu-items/:id", oneOrderMenuItemController)

orderMenuItemRouter.post("order-menu-items", zValidator('json', orderMenuItemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addOrderMenuItemController)

orderMenuItemRouter.put("/order-menu-items/:id", updateOrderMenuItemController)

orderMenuItemRouter.delete("/order-menu-items/:id", deleteOrderMenuItemController)

export default orderMenuItemRouter;