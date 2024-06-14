import { Hono } from 'hono'
import { cityController, addCityController, oneCityController, updateCityController, deleteCityController } from './city.controller'
import { citySchema } from '../validator'
import { zValidator } from '@hono/zod-validator'
import { adminRoleAuth, userRoleAuth, allRoleAuth } from "../middleware/bearAuth";


export const cityRouter = new Hono();

cityRouter.get('cities', adminRoleAuth, cityController);

cityRouter.get("/cities/:id", allRoleAuth, oneCityController)

cityRouter.post("cities", adminRoleAuth, zValidator('json', citySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addCityController)

cityRouter.put("/cities/:id", adminRoleAuth, updateCityController)

cityRouter.delete("/cities/:id", adminRoleAuth, deleteCityController)

export default cityRouter;