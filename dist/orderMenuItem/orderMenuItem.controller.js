"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderMenuItemController = exports.updateOrderMenuItemController = exports.addOrderMenuItemController = exports.oneOrderMenuItemController = exports.orderMenuItemController = void 0;
const orderMenuItem_service_1 = require("./orderMenuItem.service");
const orderMenuItemController = async (c) => {
    try {
        const orderMenuItem = await (0, orderMenuItem_service_1.orderMenuItemService)();
        return c.json(orderMenuItem);
    }
    catch (err) {
        console.error(err);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
};
exports.orderMenuItemController = orderMenuItemController;
const oneOrderMenuItemController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const orderMenuItem = await (0, orderMenuItem_service_1.oneOrderMenuItemService)(id);
    if (orderMenuItem == undefined) {
        return c.text("orderMenuItem not found", 404);
    }
    return c.json(orderMenuItem, 200);
};
exports.oneOrderMenuItemController = oneOrderMenuItemController;
//add orderMenuItem
const addOrderMenuItemController = async (c) => {
    try {
        const orderMenuItem = await c.req.json();
        const createdOrderMenuItem = await (0, orderMenuItem_service_1.addOrderMenuItemService)(orderMenuItem);
        if (!createdOrderMenuItem)
            return c.text("User not created", 404);
        return c.json({ msg: createdOrderMenuItem }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.addOrderMenuItemController = addOrderMenuItemController;
// update orderMenuItem
const updateOrderMenuItemController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await c.req.json();
    try {
        const searchedOrderMenuItem = await (0, orderMenuItem_service_1.oneOrderMenuItemService)(id);
        if (searchedOrderMenuItem == undefined)
            return c.text("orderMenuItem not found", 404);
        const res = await (0, orderMenuItem_service_1.updateOrderMenuItemService)(id, user);
        if (!res)
            return c.text("orderMenuItem not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateOrderMenuItemController = updateOrderMenuItemController;
const deleteOrderMenuItemController = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const orderMenuItem = await (0, orderMenuItem_service_1.oneOrderMenuItemService)(id);
        if (orderMenuItem == undefined)
            return c.text("orderMenuItem not found", 404);
        const res = await (0, orderMenuItem_service_1.deleteOrderMenuItemService)(id);
        if (!res)
            return c.text("orderMenuItem not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteOrderMenuItemController = deleteOrderMenuItemController;
