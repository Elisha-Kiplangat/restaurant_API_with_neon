"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantOwnerRouter = void 0;
const hono_1 = require("hono");
const restaurantOwner_controller_1 = require("./restaurantOwner.controller");
const validator_1 = require("../validator");
const zod_validator_1 = require("@hono/zod-validator");
exports.restaurantOwnerRouter = new hono_1.Hono();
exports.restaurantOwnerRouter.get('restaurant-owners', restaurantOwner_controller_1.restaurantOwnerController);
exports.restaurantOwnerRouter.get("/restaurant-owners/:id", restaurantOwner_controller_1.oneRestaurantOwnerController);
exports.restaurantOwnerRouter.post("restaurant-owners", (0, zod_validator_1.zValidator)('json', validator_1.restaurantOwnerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), restaurantOwner_controller_1.addRestaurantOwnerController);
exports.restaurantOwnerRouter.put("/restaurant-owners/:id", restaurantOwner_controller_1.updateRestaurantOwnerController);
exports.restaurantOwnerRouter.delete("/restaurant-owners/:id", restaurantOwner_controller_1.deleteRestaurantOwnerController);
exports.default = exports.restaurantOwnerRouter;
