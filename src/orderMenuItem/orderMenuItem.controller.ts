import { Context } from "hono";
import { orderMenuItemService, oneOrderMenuItemService, addOrderMenuItemService, updateOrderMenuItemService, deleteOrderMenuItemService } from "./orderMenuItem.service";

export const orderMenuItemController = async (c: Context) => {
    try {
        const orderMenuItem = await orderMenuItemService();
        return c.json(orderMenuItem);
    } catch (err: any) {
        console.error(err)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const oneOrderMenuItemController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const orderMenuItem = await oneOrderMenuItemService(id);
    if (orderMenuItem == undefined) {
        return c.text("orderMenuItem not found", 404);
    }
    return c.json(orderMenuItem, 200);
}

//add orderMenuItem

export const addOrderMenuItemController = async (c: Context) => {
    try {
        const orderMenuItem = await c.req.json();
        const createdOrderMenuItem = await addOrderMenuItemService(orderMenuItem);

        if (!createdOrderMenuItem) return c.text("User not created", 404);
        return c.json({ msg: createdOrderMenuItem }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

// update orderMenuItem

export const updateOrderMenuItemController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {

        const searchedOrderMenuItem = await oneOrderMenuItemService(id);
        if (searchedOrderMenuItem == undefined) return c.text("orderMenuItem not found", 404);

        const res = await updateOrderMenuItemService(id, user);

        if (!res) return c.text("orderMenuItem not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteOrderMenuItemController = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const orderMenuItem = await oneOrderMenuItemService(id);
        if (orderMenuItem == undefined) return c.text("orderMenuItem not found", 404);

        const res = await deleteOrderMenuItemService(id);
        if (!res) return c.text("orderMenuItem not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}