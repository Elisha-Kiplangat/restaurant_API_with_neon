import { Context } from "hono";
import { restaurantOwnerService, oneRestaurantOwnerService, addRestaurantOwnerService, updateRestaurantOwnerService, deleteRestaurantOwnerService } from "./restaurantOwner.service";

export const restaurantOwnerController = async (c: Context) => {
    try {
        const restaurantOwner = await restaurantOwnerService();
        return c.json(restaurantOwner);
    } catch (err: any) {
        console.error(err)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const oneRestaurantOwnerController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const restaurantOwner = await oneRestaurantOwnerService(id);
    if (restaurantOwner == undefined) {
        return c.text("restaurantOwner not found", 404);
    }
    return c.json(restaurantOwner, 200);
}

//add restaurantOwner

export const addRestaurantOwnerController = async (c: Context) => {
    try {
        const restaurantOwner = await c.req.json();
        const createdRestaurantOwner = await addRestaurantOwnerService(restaurantOwner);

        if (!createdRestaurantOwner) return c.text("Restaurant not created", 404);
        return c.json({ msg: createdRestaurantOwner }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

// update restaurantOwner

export const updateRestaurantOwnerController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {

        const searchedRestaurantOwner = await oneRestaurantOwnerService(id);
        if (searchedRestaurantOwner == undefined) return c.text("restaurant Owner not found", 404);

        const res = await updateRestaurantOwnerService(id, user);

        if (!res) return c.text("restaurant Owner not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteRestaurantOwnerController = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const restaurantOwner = await oneRestaurantOwnerService(id);
        if (restaurantOwner == undefined) return c.text("restaurant Owner not found", 404);

        const res = await deleteRestaurantOwnerService(id);
        if (!res) return c.text("restaurant Owner not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}