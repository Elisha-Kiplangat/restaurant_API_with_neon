"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantController = exports.updateRestaurantController = exports.addRestaurantController = exports.oneRestaurantController = exports.restaurantController = void 0;
const restaurant_service_1 = require("./restaurant.service");
const restaurantController = async (c) => {
    try {
        const restaurants = await (0, restaurant_service_1.restaurantService)();
        return c.json(restaurants);
    }
    catch (err) {
        console.error(err);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
};
exports.restaurantController = restaurantController;
const oneRestaurantController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const restaurant = await (0, restaurant_service_1.oneRestaurantService)(id);
    if (restaurant == undefined) {
        return c.text("Restaurant not found", 404);
    }
    return c.json(restaurant, 200);
};
exports.oneRestaurantController = oneRestaurantController;
//add restaurant
const addRestaurantController = async (c) => {
    try {
        const restaurant = await c.req.json();
        const createdRestaurant = await (0, restaurant_service_1.addRestaurantService)(restaurant);
        if (!createdRestaurant)
            return c.text("Restaurant not created", 404);
        return c.json({ msg: createdRestaurant }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.addRestaurantController = addRestaurantController;
const updateRestaurantController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const restaurant = await c.req.json();
    try {
        const searchedRestaurant = await (0, restaurant_service_1.oneRestaurantService)(id);
        if (searchedRestaurant == undefined)
            return c.text("Restaurant not found", 404);
        const res = await (0, restaurant_service_1.updateRestaurantService)(id, restaurant);
        if (!res)
            return c.text("Restaurant not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateRestaurantController = updateRestaurantController;
const deleteRestaurantController = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const restaurant = await (0, restaurant_service_1.oneRestaurantService)(id);
        if (restaurant == undefined)
            return c.text("Restaurant not found", 404);
        const res = await (0, restaurant_service_1.deleteRestaurantService)(id);
        if (!res)
            return c.text("Restaurant not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteRestaurantController = deleteRestaurantController;
