import { Context } from "hono";
import { statusCatalogService, oneStatusCatalogService, addStatusCatalogService, updateStatusCatalogService, deleteStatusCatalogService } from "./statusCatalog.service";

export const statusCatalogController = async (c: Context) => {
    try {
        const statusCatalog = await statusCatalogService();
        return c.json(statusCatalog);
    } catch (err: any) {
        console.error(err)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const oneStatusCatalogController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const statusCatalog = await oneStatusCatalogService(id);
    if (statusCatalog == undefined) {
        return c.text("statusCatalog not found", 404);
    }
    return c.json(statusCatalog, 200);
}

//add statusCatalog

export const addStatusCatalogController = async (c: Context) => {
    try {
        const statusCatalog = await c.req.json();
        const createdStatusCatalog = await addStatusCatalogService(statusCatalog);

        if (!createdStatusCatalog) return c.text("User not created", 404);
        return c.json({ msg: createdStatusCatalog }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

// update statusCatalog

export const updateStatusCatalogController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {

        const searchedStatusCatalog = await oneStatusCatalogService(id);
        if (searchedStatusCatalog == undefined) return c.text("statusCatalog not found", 404);

        const res = await updateStatusCatalogService(id, user);

        if (!res) return c.text("statusCatalog not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteStatusCatalogController = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const statusCatalog = await oneStatusCatalogService(id);
        if (statusCatalog == undefined) return c.text("statusCatalog not found", 404);

        const res = await deleteStatusCatalogService(id);
        if (!res) return c.text("statusCatalog not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}