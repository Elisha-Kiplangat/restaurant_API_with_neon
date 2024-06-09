import {Hono} from 'hono'
import {stateController, addState, oneStateController, updateStateController, deleteStateController} from './state.controller'
import { zValidator } from "@hono/zod-validator";
import { stateSchema } from "../validator";

export const stateRouter = new Hono();

stateRouter.get('states', stateController);

stateRouter.get("/states/:id", oneStateController)

stateRouter.post("states", zValidator('json', stateSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addState)

stateRouter.put("/states/:id", updateStateController)

stateRouter.delete("/states/:id", deleteStateController)

export default stateRouter;