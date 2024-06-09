import { Context } from "hono";
import { orderStatusService, oneOrderStatusService, addOrderStatusService, updateOrderStatusService, deleteOrderStatusService } from "./orderStatus.service";

export const orderStatusController = async (c: Context) => {
    try {
        const orderStatus = await orderStatusService();
        return c.json(orderStatus);
    } catch (err: any) {
        console.error(err)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const oneOrderStatusController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const orderStatus = await oneOrderStatusService(id);
    if (orderStatus == undefined) {
        return c.text("order Status not found", 404);
    }
    return c.json(orderStatus, 200);
}

//add orderStatus

export const addOrderStatusController = async (c: Context) => {
    try {
        const orderStatus = await c.req.json();
        const createdOrderStatus = await addOrderStatusService(orderStatus);

        if (!createdOrderStatus) return c.text("Order status not created", 404);
        return c.json({ msg: createdOrderStatus }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

// update orderStatus

export const updateOrderStatusController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {

        const searchedOrderStatus = await oneOrderStatusService(id);
        if (searchedOrderStatus == undefined) return c.text("order Status not found", 404);

        const res = await updateOrderStatusService(id, user);

        if (!res) return c.text("order Status not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteOrderStatusController = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const orderStatus = await oneOrderStatusService(id);
        if (orderStatus == undefined) return c.text("order Status not found", 404);

        const res = await deleteOrderStatusService(id);
        if (!res) return c.text("order Status not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}