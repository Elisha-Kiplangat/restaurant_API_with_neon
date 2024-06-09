"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantRouter = void 0;
const hono_1 = require("hono");
const restaurant_controller_1 = require("./restaurant.controller");
const validator_1 = require("../validator");
const zod_validator_1 = require("@hono/zod-validator");
exports.restaurantRouter = new hono_1.Hono();
exports.restaurantRouter.get('/restaurants', restaurant_controller_1.restaurantController);
//one restaurant
exports.restaurantRouter.get("/restaurants/:id", restaurant_controller_1.oneRestaurantController);
//add restaurant
exports.restaurantRouter.post("restaurants", (0, zod_validator_1.zValidator)('json', validator_1.restaurantSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), restaurant_controller_1.addRestaurantController);
//update a restaurant
exports.restaurantRouter.put("/restaurants/:id", restaurant_controller_1.updateRestaurantController);
exports.restaurantRouter.delete("/restaurants/:id", restaurant_controller_1.deleteRestaurantController);
exports.default = exports.restaurantRouter;
