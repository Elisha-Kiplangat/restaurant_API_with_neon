import { Context } from "hono";
import { orderService, oneOrderService, addOrderService, updateOrderService, deleteOrderService } from "./orders.service";

export const ordersController = async (c: Context) => {
    try{
        const orders = await orderService();
        return c.json(orders);
    } catch (err: any) {
        console.error(err)
        return c.json({error: 'Internal Server Error'}, 500)
    }
}

export const oneOrderController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const order = await oneOrderService(id);
    if (order == undefined) {
        return c.text("order not found", 404);
    }
    return c.json(order, 200);
}

//add order

export const addOrderController = async (c: Context) => {
    try {
        const order = await c.req.json();
        const createdorder = await addOrderService(order);

        if (!createdorder) return c.text("order not created", 404);
        return c.json({ msg: createdorder }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateOrderController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const order = await c.req.json();
    try {
        const searchedorder = await oneOrderService(id);
        if (searchedorder == undefined) return c.text("order not found", 404);
        const res = await updateOrderService(id, order);
        if (!res) return c.text("order not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteOrderController = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const order = await oneOrderService(id);
        if (order == undefined) return c.text("order not found", 404);
        const res = await deleteOrderService(id);
        if (!res) return c.text("order not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
