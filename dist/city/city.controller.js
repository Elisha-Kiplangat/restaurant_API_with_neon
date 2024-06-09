"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCityController = exports.updateCityController = exports.addCityController = exports.oneCityController = exports.cityController = void 0;
const city_service_1 = require("./city.service");
const cityController = async (c) => {
    try {
        const city = await (0, city_service_1.cityService)();
        return c.json(city);
    }
    catch (err) {
        console.error(err);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
};
exports.cityController = cityController;
const oneCityController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const city = await (0, city_service_1.oneCityService)(id);
    if (city == undefined) {
        return c.text("city not found", 404);
    }
    return c.json(city, 200);
};
exports.oneCityController = oneCityController;
//add city
const addCityController = async (c) => {
    try {
        const city = await c.req.json();
        const createdcity = await (0, city_service_1.addCityService)(city);
        if (!createdcity)
            return c.text("User not created", 404);
        return c.json({ msg: createdcity }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.addCityController = addCityController;
// update city
const updateCityController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await c.req.json();
    try {
        const searchedcity = await (0, city_service_1.oneCityService)(id);
        if (searchedcity == undefined)
            return c.text("city not found", 404);
        const res = await (0, city_service_1.updateCityService)(id, user);
        if (!res)
            return c.text("city not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateCityController = updateCityController;
const deleteCityController = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const city = await (0, city_service_1.oneCityService)(id);
        if (city == undefined)
            return c.text("city not found", 404);
        const res = await (0, city_service_1.deleteCityService)(id);
        if (!res)
            return c.text("city not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteCityController = deleteCityController;
