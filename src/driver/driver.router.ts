import { Hono } from 'hono'
import { driverController, addDriverController, oneDriverController, updateDriverController, deleteDriverController, driverWithAddressController } from './driver.controller'
import { driverSchema } from '../validator'
import { zValidator } from '@hono/zod-validator'
import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";

export const driverRouter = new Hono();

driverRouter.get('drivers', adminRoleAuth, driverController);

driverRouter.get("/drivers/:id", userRoleAuth, oneDriverController)

driverRouter.post("drivers", zValidator('json', driverSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addDriverController)

driverRouter.put("/drivers/:id", updateDriverController)

driverRouter.delete("/drivers/:id", adminRoleAuth, deleteDriverController)

driverRouter.get("/drivers-with-address/:id",adminRoleAuth, driverWithAddressController)

export default driverRouter;