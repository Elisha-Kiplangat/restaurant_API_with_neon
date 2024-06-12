import { Hono } from 'hono'
import { cityController, addCityController, oneCityController, updateCityController, deleteCityController } from './city.controller'
import { citySchema } from '../validator'
import { zValidator } from '@hono/zod-validator'
import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";

export const cityRouter = new Hono();

cityRouter.get('cities', adminRoleAuth, cityController);

cityRouter.get("/cities/:id", userRoleAuth, oneCityController)

cityRouter.post("cities", userRoleAuth, zValidator('json', citySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addCityController)

cityRouter.put("/cities/:id", userRoleAuth, updateCityController)

cityRouter.delete("/cities/:id", adminRoleAuth, deleteCityController)

export default cityRouter;