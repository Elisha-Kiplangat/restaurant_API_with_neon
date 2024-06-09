"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItemController = exports.updateMenuItemController = exports.addMenuItem = exports.oneMenuItemController = exports.menuItemController = void 0;
const menuItem_service_1 = require("./menuItem.service");
const menuItemController = async (c) => {
    try {
        const menuItem = await (0, menuItem_service_1.menuItemService)();
        return c.json(menuItem);
    }
    catch (err) {
        console.error(err);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
};
exports.menuItemController = menuItemController;
const oneMenuItemController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const menuItem = await (0, menuItem_service_1.oneMenuItemService)(id);
    if (menuItem == undefined) {
        return c.text("menuItem not found", 404);
    }
    return c.json(menuItem, 200);
};
exports.oneMenuItemController = oneMenuItemController;
//add menuItem
const addMenuItem = async (c) => {
    try {
        const menuItem = await c.req.json();
        const createdMenuItem = await (0, menuItem_service_1.addMenuItemService)(menuItem);
        if (!createdMenuItem)
            return c.text("User not created", 404);
        return c.json({ msg: createdMenuItem }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.addMenuItem = addMenuItem;
// update menuItem
const updateMenuItemController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await c.req.json();
    try {
        const searchedMenuItem = await (0, menuItem_service_1.oneMenuItemService)(id);
        if (searchedMenuItem == undefined)
            return c.text("menuItem not found", 404);
        const res = await (0, menuItem_service_1.updateMenuItemService)(id, user);
        if (!res)
            return c.text("menuItem not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateMenuItemController = updateMenuItemController;
const deleteMenuItemController = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const menuItem = await (0, menuItem_service_1.oneMenuItemService)(id);
        if (menuItem == undefined)
            return c.text("menuItem not found", 404);
        const res = await (0, menuItem_service_1.deleteMenuItemService)(id);
        if (!res)
            return c.text("menuItem not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteMenuItemController = deleteMenuItemController;
