import { Hono } from 'hono'
import { restaurantOwnerController, addRestaurantOwnerController, oneRestaurantOwnerController, updateRestaurantOwnerController, deleteRestaurantOwnerController } from './restaurantOwner.controller'
import { restaurantOwnerSchema } from '../validator'
import { zValidator } from '@hono/zod-validator'
import { adminRoleAuth, userRoleAuth, allRoleAuth } from "../middleware/bearAuth";


export const restaurantOwnerRouter = new Hono();

restaurantOwnerRouter.get('restaurant-owners', adminRoleAuth, restaurantOwnerController);

restaurantOwnerRouter.get("/restaurant-owners/:id", adminRoleAuth, oneRestaurantOwnerController)

restaurantOwnerRouter.post("restaurant-owners", adminRoleAuth, zValidator('json', restaurantOwnerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addRestaurantOwnerController)

restaurantOwnerRouter.put("/restaurant-owners/:id", adminRoleAuth, updateRestaurantOwnerController)

restaurantOwnerRouter.delete("/restaurant-owners/:id", adminRoleAuth, deleteRestaurantOwnerController)

export default restaurantOwnerRouter;