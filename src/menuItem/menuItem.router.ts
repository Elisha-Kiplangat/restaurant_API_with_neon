import {Hono} from 'hono'
import { addMenuItem, menuItemController, oneMenuItemController, updateMenuItemController, deleteMenuItemController } from './menuItem.controller'
import { menuItemSchema } from '../validator'
import { zValidator } from '@hono/zod-validator'

export const menuItemRouter = new Hono();

menuItemRouter.get('menu-items', menuItemController);

menuItemRouter.get("/menu-items/:id", oneMenuItemController)

menuItemRouter.post("menu-items", zValidator('json', menuItemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addMenuItem)

menuItemRouter.put("/menu-items/:id", updateMenuItemController)

menuItemRouter.delete("/menu-items/:id", deleteMenuItemController)

export default menuItemRouter;