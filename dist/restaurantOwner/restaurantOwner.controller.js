"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantOwnerController = exports.updateRestaurantOwnerController = exports.addRestaurantOwnerController = exports.oneRestaurantOwnerController = exports.restaurantOwnerController = void 0;
const restaurantOwner_service_1 = require("./restaurantOwner.service");
const restaurantOwnerController = async (c) => {
    try {
        const restaurantOwner = await (0, restaurantOwner_service_1.restaurantOwnerService)();
        return c.json(restaurantOwner);
    }
    catch (err) {
        console.error(err);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
};
exports.restaurantOwnerController = restaurantOwnerController;
const oneRestaurantOwnerController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const restaurantOwner = await (0, restaurantOwner_service_1.oneRestaurantOwnerService)(id);
    if (restaurantOwner == undefined) {
        return c.text("restaurantOwner not found", 404);
    }
    return c.json(restaurantOwner, 200);
};
exports.oneRestaurantOwnerController = oneRestaurantOwnerController;
//add restaurantOwner
const addRestaurantOwnerController = async (c) => {
    try {
        const restaurantOwner = await c.req.json();
        const createdRestaurantOwner = await (0, restaurantOwner_service_1.addRestaurantOwnerService)(restaurantOwner);
        if (!createdRestaurantOwner)
            return c.text("Restaurant not created", 404);
        return c.json({ msg: createdRestaurantOwner }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.addRestaurantOwnerController = addRestaurantOwnerController;
// update restaurantOwner
const updateRestaurantOwnerController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await c.req.json();
    try {
        const searchedRestaurantOwner = await (0, restaurantOwner_service_1.oneRestaurantOwnerService)(id);
        if (searchedRestaurantOwner == undefined)
            return c.text("restaurant Owner not found", 404);
        const res = await (0, restaurantOwner_service_1.updateRestaurantOwnerService)(id, user);
        if (!res)
            return c.text("restaurant Owner not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateRestaurantOwnerController = updateRestaurantOwnerController;
const deleteRestaurantOwnerController = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const restaurantOwner = await (0, restaurantOwner_service_1.oneRestaurantOwnerService)(id);
        if (restaurantOwner == undefined)
            return c.text("restaurant Owner not found", 404);
        const res = await (0, restaurantOwner_service_1.deleteRestaurantOwnerService)(id);
        if (!res)
            return c.text("restaurant Owner not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteRestaurantOwnerController = deleteRestaurantOwnerController;
