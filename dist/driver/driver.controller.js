"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDriverController = exports.updateDriverController = exports.addDriverController = exports.oneDriverController = exports.driverController = void 0;
const driver_service_1 = require("./driver.service");
const driverController = async (c) => {
    try {
        const driver = await (0, driver_service_1.driverService)();
        return c.json(driver);
    }
    catch (err) {
        console.error(err);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
};
exports.driverController = driverController;
const oneDriverController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const driver = await (0, driver_service_1.oneDriverService)(id);
    if (driver == undefined) {
        return c.text("driver not found", 404);
    }
    return c.json(driver, 200);
};
exports.oneDriverController = oneDriverController;
//add driver
const addDriverController = async (c) => {
    try {
        const driver = await c.req.json();
        const createdDriver = await (0, driver_service_1.addDriverService)(driver);
        if (!createdDriver)
            return c.text("User not created", 404);
        return c.json({ msg: createdDriver }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.addDriverController = addDriverController;
// update driver
const updateDriverController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await c.req.json();
    try {
        const searchedDriver = await (0, driver_service_1.oneDriverService)(id);
        if (searchedDriver == undefined)
            return c.text("driver not found", 404);
        const res = await (0, driver_service_1.updateDriverService)(id, user);
        if (!res)
            return c.text("driver not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateDriverController = updateDriverController;
const deleteDriverController = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const driver = await (0, driver_service_1.oneDriverService)(id);
        if (driver == undefined)
            return c.text("driver not found", 404);
        const res = await (0, driver_service_1.deleteDriverService)(id);
        if (!res)
            return c.text("driver not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteDriverController = deleteDriverController;
