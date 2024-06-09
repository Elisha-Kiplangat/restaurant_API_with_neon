"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStatusRouter = void 0;
const hono_1 = require("hono");
const orderStatus_controller_1 = require("./orderStatus.controller");
const validator_1 = require("../validator");
const zod_validator_1 = require("@hono/zod-validator");
exports.orderStatusRouter = new hono_1.Hono();
exports.orderStatusRouter.get('order-status', orderStatus_controller_1.orderStatusController);
exports.orderStatusRouter.get("/order-status/:id", orderStatus_controller_1.oneOrderStatusController);
exports.orderStatusRouter.post("order-status", (0, zod_validator_1.zValidator)('json', validator_1.orderStatusSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), orderStatus_controller_1.addOrderStatusController);
exports.orderStatusRouter.put("/order-status/:id", orderStatus_controller_1.updateOrderStatusController);
exports.orderStatusRouter.delete("/order-status/:id", orderStatus_controller_1.deleteOrderStatusController);
exports.default = exports.orderStatusRouter;
