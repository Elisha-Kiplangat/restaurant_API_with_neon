"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverRouter = void 0;
const hono_1 = require("hono");
const driver_controller_1 = require("./driver.controller");
const validator_1 = require("../validator");
const zod_validator_1 = require("@hono/zod-validator");
const bearAuth_1 = require("../middleware/bearAuth");
exports.driverRouter = new hono_1.Hono();
exports.driverRouter.get('drivers', bearAuth_1.adminRoleAuth, driver_controller_1.driverController);
exports.driverRouter.get("/drivers/:id", bearAuth_1.allRoleAuth, driver_controller_1.oneDriverController);
exports.driverRouter.post("drivers", bearAuth_1.adminRoleAuth, (0, zod_validator_1.zValidator)('json', validator_1.driverSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), driver_controller_1.addDriverController);
exports.driverRouter.put("/drivers/:id", bearAuth_1.adminRoleAuth, driver_controller_1.updateDriverController);
exports.driverRouter.delete("/drivers/:id", bearAuth_1.adminRoleAuth, driver_controller_1.deleteDriverController);
exports.driverRouter.get("/drivers-with-address/:id", bearAuth_1.adminRoleAuth, driver_controller_1.driverWithAddressController);
exports.default = exports.driverRouter;
