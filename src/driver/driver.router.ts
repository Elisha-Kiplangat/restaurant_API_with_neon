import { Hono } from 'hono'
import { driverController, addDriverController, oneDriverController, updateDriverController, deleteDriverController } from './driver.controller'
import { driverSchema } from '../validator'
import { zValidator } from '@hono/zod-validator'


export const driverRouter = new Hono();

driverRouter.get('drivers', driverController);

driverRouter.get("/drivers/:id", oneDriverController)

driverRouter.post("drivers", zValidator('json', driverSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addDriverController)

driverRouter.put("/drivers/:id", updateDriverController)

driverRouter.delete("/drivers/:id", deleteDriverController)

export default driverRouter;