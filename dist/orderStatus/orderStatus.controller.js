"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderStatusController = exports.updateOrderStatusController = exports.addOrderStatusController = exports.oneOrderStatusController = exports.orderStatusController = void 0;
const orderStatus_service_1 = require("./orderStatus.service");
const orderStatusController = async (c) => {
    try {
        const orderStatus = await (0, orderStatus_service_1.orderStatusService)();
        return c.json(orderStatus);
    }
    catch (err) {
        console.error(err);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
};
exports.orderStatusController = orderStatusController;
const oneOrderStatusController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const orderStatus = await (0, orderStatus_service_1.oneOrderStatusService)(id);
    if (orderStatus == undefined) {
        return c.text("order Status not found", 404);
    }
    return c.json(orderStatus, 200);
};
exports.oneOrderStatusController = oneOrderStatusController;
//add orderStatus
const addOrderStatusController = async (c) => {
    try {
        const orderStatus = await c.req.json();
        const createdOrderStatus = await (0, orderStatus_service_1.addOrderStatusService)(orderStatus);
        if (!createdOrderStatus)
            return c.text("Order status not created", 404);
        return c.json({ msg: createdOrderStatus }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.addOrderStatusController = addOrderStatusController;
// update orderStatus
const updateOrderStatusController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await c.req.json();
    try {
        const searchedOrderStatus = await (0, orderStatus_service_1.oneOrderStatusService)(id);
        if (searchedOrderStatus == undefined)
            return c.text("order Status not found", 404);
        const res = await (0, orderStatus_service_1.updateOrderStatusService)(id, user);
        if (!res)
            return c.text("order Status not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateOrderStatusController = updateOrderStatusController;
const deleteOrderStatusController = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const orderStatus = await (0, orderStatus_service_1.oneOrderStatusService)(id);
        if (orderStatus == undefined)
            return c.text("order Status not found", 404);
        const res = await (0, orderStatus_service_1.deleteOrderStatusService)(id);
        if (!res)
            return c.text("order Status not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteOrderStatusController = deleteOrderStatusController;
