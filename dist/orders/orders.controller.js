"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderController = exports.updateOrderController = exports.addOrderController = exports.oneOrderController = exports.ordersController = void 0;
const orders_service_1 = require("./orders.service");
const ordersController = async (c) => {
    try {
        const orders = await (0, orders_service_1.orderService)();
        return c.json(orders);
    }
    catch (err) {
        console.error(err);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
};
exports.ordersController = ordersController;
const oneOrderController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const order = await (0, orders_service_1.oneOrderService)(id);
    if (order == undefined) {
        return c.text("order not found", 404);
    }
    return c.json(order, 200);
};
exports.oneOrderController = oneOrderController;
//add order
const addOrderController = async (c) => {
    try {
        const order = await c.req.json();
        const createdorder = await (0, orders_service_1.addOrderService)(order);
        if (!createdorder)
            return c.text("order not created", 404);
        return c.json({ msg: createdorder }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.addOrderController = addOrderController;
const updateOrderController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const order = await c.req.json();
    try {
        const searchedorder = await (0, orders_service_1.oneOrderService)(id);
        if (searchedorder == undefined)
            return c.text("order not found", 404);
        const res = await (0, orders_service_1.updateOrderService)(id, order);
        if (!res)
            return c.text("order not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateOrderController = updateOrderController;
const deleteOrderController = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const order = await (0, orders_service_1.oneOrderService)(id);
        if (order == undefined)
            return c.text("order not found", 404);
        const res = await (0, orders_service_1.deleteOrderService)(id);
        if (!res)
            return c.text("order not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteOrderController = deleteOrderController;
