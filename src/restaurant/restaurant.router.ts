import {Hono} from 'hono'
import {restaurantController, oneRestaurantController, addRestaurantController, deleteRestaurantController, updateRestaurantController} from './restaurant.controller'
import {restaurantSchema} from '../validator'
import { zValidator } from '@hono/zod-validator';


export const restaurantRouter = new Hono();

restaurantRouter.get('/restaurants', restaurantController);

//one restaurant
restaurantRouter.get("/restaurants/:id", oneRestaurantController)

//add restaurant

restaurantRouter.post("restaurants", zValidator('json', restaurantSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addRestaurantController)

//update a restaurant
restaurantRouter.put("/restaurants/:id", updateRestaurantController)

restaurantRouter.delete("/restaurants/:id", deleteRestaurantController)


export default restaurantRouter;