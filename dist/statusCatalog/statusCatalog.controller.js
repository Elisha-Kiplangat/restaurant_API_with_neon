"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatusCatalogController = exports.updateStatusCatalogController = exports.addStatusCatalogController = exports.oneStatusCatalogController = exports.statusCatalogController = void 0;
const statusCatalog_service_1 = require("./statusCatalog.service");
const statusCatalogController = async (c) => {
    try {
        const statusCatalog = await (0, statusCatalog_service_1.statusCatalogService)();
        return c.json(statusCatalog);
    }
    catch (err) {
        console.error(err);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
};
exports.statusCatalogController = statusCatalogController;
const oneStatusCatalogController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const statusCatalog = await (0, statusCatalog_service_1.oneStatusCatalogService)(id);
    if (statusCatalog == undefined) {
        return c.text("statusCatalog not found", 404);
    }
    return c.json(statusCatalog, 200);
};
exports.oneStatusCatalogController = oneStatusCatalogController;
//add statusCatalog
const addStatusCatalogController = async (c) => {
    try {
        const statusCatalog = await c.req.json();
        const createdStatusCatalog = await (0, statusCatalog_service_1.addStatusCatalogService)(statusCatalog);
        if (!createdStatusCatalog)
            return c.text("User not created", 404);
        return c.json({ msg: createdStatusCatalog }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.addStatusCatalogController = addStatusCatalogController;
// update statusCatalog
const updateStatusCatalogController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await c.req.json();
    try {
        const searchedStatusCatalog = await (0, statusCatalog_service_1.oneStatusCatalogService)(id);
        if (searchedStatusCatalog == undefined)
            return c.text("statusCatalog not found", 404);
        const res = await (0, statusCatalog_service_1.updateStatusCatalogService)(id, user);
        if (!res)
            return c.text("statusCatalog not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateStatusCatalogController = updateStatusCatalogController;
const deleteStatusCatalogController = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const statusCatalog = await (0, statusCatalog_service_1.oneStatusCatalogService)(id);
        if (statusCatalog == undefined)
            return c.text("statusCatalog not found", 404);
        const res = await (0, statusCatalog_service_1.deleteStatusCatalogService)(id);
        if (!res)
            return c.text("statusCatalog not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteStatusCatalogController = deleteStatusCatalogController;
