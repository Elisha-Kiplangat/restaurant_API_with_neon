import {Hono} from 'hono'
import { restaurantController, oneRestaurantController, addRestaurantController, deleteRestaurantController, updateRestaurantController, restaurantWithOwnerController } from './restaurant.controller'
import {restaurantSchema} from '../validator'
import { zValidator } from '@hono/zod-validator';
import { adminRoleAuth, userRoleAuth, allRoleAuth } from "../middleware/bearAuth";

export const restaurantRouter = new Hono();

restaurantRouter.get('/restaurants', allRoleAuth, restaurantController);

//one restaurant
restaurantRouter.get("/restaurants/:id", allRoleAuth, oneRestaurantController)

//add restaurant

restaurantRouter.post("restaurants", adminRoleAuth, zValidator('json', restaurantSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addRestaurantController)

//update a restaurant
restaurantRouter.put("/restaurants/:id", adminRoleAuth, updateRestaurantController)

restaurantRouter.delete("/restaurants/:id", adminRoleAuth, deleteRestaurantController)

restaurantRouter.get("/restaurants-with-owner/:id",adminRoleAuth, restaurantWithOwnerController)



export default restaurantRouter;