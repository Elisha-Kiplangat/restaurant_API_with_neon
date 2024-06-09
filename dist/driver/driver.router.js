"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverRouter = void 0;
const hono_1 = require("hono");
const driver_controller_1 = require("./driver.controller");
const validator_1 = require("../validator");
const zod_validator_1 = require("@hono/zod-validator");
exports.driverRouter = new hono_1.Hono();
exports.driverRouter.get('drivers', driver_controller_1.driverController);
exports.driverRouter.get("/drivers/:id", driver_controller_1.oneDriverController);
exports.driverRouter.post("drivers", (0, zod_validator_1.zValidator)('json', validator_1.driverSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), driver_controller_1.addDriverController);
exports.driverRouter.put("/drivers/:id", driver_controller_1.updateDriverController);
exports.driverRouter.delete("/drivers/:id", driver_controller_1.deleteDriverController);
exports.default = exports.driverRouter;
