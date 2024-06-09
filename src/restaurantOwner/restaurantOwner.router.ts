import { Hono } from 'hono'
import { restaurantOwnerController, addRestaurantOwnerController, oneRestaurantOwnerController, updateRestaurantOwnerController, deleteRestaurantOwnerController } from './restaurantOwner.controller'
import { restaurantOwnerSchema } from '../validator'
import { zValidator } from '@hono/zod-validator'


export const restaurantOwnerRouter = new Hono();

restaurantOwnerRouter.get('restaurant-owners', restaurantOwnerController);

restaurantOwnerRouter.get("/restaurant-owners/:id", oneRestaurantOwnerController)

restaurantOwnerRouter.post("restaurant-owners", zValidator('json', restaurantOwnerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addRestaurantOwnerController)

restaurantOwnerRouter.put("/restaurant-owners/:id", updateRestaurantOwnerController)

restaurantOwnerRouter.delete("/restaurant-owners/:id", deleteRestaurantOwnerController)

export default restaurantOwnerRouter;