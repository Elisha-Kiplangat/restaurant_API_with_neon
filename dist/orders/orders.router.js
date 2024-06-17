"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const orders_controller_1 = require("./orders.controller");
const validator_1 = require("../validator");
const bearAuth_1 = require("../middleware/bearAuth");
exports.ordersRouter = new hono_1.Hono();
exports.ordersRouter.get('orders', bearAuth_1.adminRoleAuth, orders_controller_1.ordersController);
//one order
exports.ordersRouter.get("/orders/:id", bearAuth_1.allRoleAuth, orders_controller_1.oneOrderController);
//add order
exports.ordersRouter.post("orders", bearAuth_1.allRoleAuth, (0, zod_validator_1.zValidator)('json', validator_1.orderSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), orders_controller_1.addOrderController);
//update a order
exports.ordersRouter.put("/orders/:id", bearAuth_1.allRoleAuth, orders_controller_1.updateOrderController);
exports.ordersRouter.delete("/orders/:id", bearAuth_1.adminRoleAuth, orders_controller_1.deleteOrderController);
exports.ordersRouter.get("/order-details/:id", bearAuth_1.adminRoleAuth, orders_controller_1.orderWithOrderMenuItemController);
exports.default = exports.ordersRouter;
