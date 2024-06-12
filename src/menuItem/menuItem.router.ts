import {Hono} from 'hono'
import { addMenuItem, menuItemController, oneMenuItemController, updateMenuItemController, deleteMenuItemController } from './menuItem.controller'
import { menuItemSchema } from '../validator'
import { zValidator } from '@hono/zod-validator'
import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";

export const menuItemRouter = new Hono();

menuItemRouter.get('menu-items', adminRoleAuth, menuItemController);

menuItemRouter.get("/menu-items/:id", userRoleAuth, oneMenuItemController)

menuItemRouter.post("menu-items", userRoleAuth, zValidator('json', menuItemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addMenuItem)

menuItemRouter.put("/menu-items/:id", userRoleAuth, updateMenuItemController)

menuItemRouter.delete("/menu-items/:id", adminRoleAuth, deleteMenuItemController)

export default menuItemRouter;