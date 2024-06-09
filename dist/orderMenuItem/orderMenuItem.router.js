"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderMenuItemRouter = void 0;
const hono_1 = require("hono");
const orderMenuItem_controller_1 = require("./orderMenuItem.controller");
const validator_1 = require("../validator");
const zod_validator_1 = require("@hono/zod-validator");
exports.orderMenuItemRouter = new hono_1.Hono();
exports.orderMenuItemRouter.get('order-menu-items', orderMenuItem_controller_1.orderMenuItemController);
exports.orderMenuItemRouter.get("/order-menu-items/:id", orderMenuItem_controller_1.oneOrderMenuItemController);
exports.orderMenuItemRouter.post("order-menu-items", (0, zod_validator_1.zValidator)('json', validator_1.orderMenuItemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), orderMenuItem_controller_1.addOrderMenuItemController);
exports.orderMenuItemRouter.put("/order-menu-items/:id", orderMenuItem_controller_1.updateOrderMenuItemController);
exports.orderMenuItemRouter.delete("/order-menu-items/:id", orderMenuItem_controller_1.deleteOrderMenuItemController);
exports.default = exports.orderMenuItemRouter;
