import { Hono } from 'hono'
import { cityController, addCityController, oneCityController, updateCityController, deleteCityController } from './city.controller'
import { citySchema } from '../validator'
import { zValidator } from '@hono/zod-validator'


export const cityRouter = new Hono();

cityRouter.get('cities', cityController);

cityRouter.get("/cities/:id", oneCityController)

cityRouter.post("cities", zValidator('json', citySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addCityController)

cityRouter.put("/cities/:id", updateCityController)

cityRouter.delete("/cities/:id", deleteCityController)

export default cityRouter;