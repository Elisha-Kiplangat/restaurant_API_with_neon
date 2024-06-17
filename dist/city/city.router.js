"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cityRouter = void 0;
const hono_1 = require("hono");
const city_controller_1 = require("./city.controller");
const validator_1 = require("../validator");
const zod_validator_1 = require("@hono/zod-validator");
const bearAuth_1 = require("../middleware/bearAuth");
exports.cityRouter = new hono_1.Hono();
exports.cityRouter.get('cities', bearAuth_1.adminRoleAuth, city_controller_1.cityController);
exports.cityRouter.get("/cities/:id", bearAuth_1.allRoleAuth, city_controller_1.oneCityController);
exports.cityRouter.post("cities", bearAuth_1.adminRoleAuth, (0, zod_validator_1.zValidator)('json', validator_1.citySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), city_controller_1.addCityController);
exports.cityRouter.put("/cities/:id", bearAuth_1.adminRoleAuth, city_controller_1.updateCityController);
exports.cityRouter.delete("/cities/:id", bearAuth_1.adminRoleAuth, city_controller_1.deleteCityController);
exports.default = exports.cityRouter;
