"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateRouter = void 0;
const hono_1 = require("hono");
const state_controller_1 = require("./state.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
exports.stateRouter = new hono_1.Hono();
exports.stateRouter.get('states', state_controller_1.stateController);
exports.stateRouter.get("/states/:id", state_controller_1.oneStateController);
exports.stateRouter.post("states", (0, zod_validator_1.zValidator)('json', validator_1.stateSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), state_controller_1.addState);
exports.stateRouter.put("/states/:id", state_controller_1.updateStateController);
exports.stateRouter.delete("/states/:id", state_controller_1.deleteStateController);
exports.default = exports.stateRouter;
