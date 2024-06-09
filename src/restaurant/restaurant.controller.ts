import { Context } from "hono";
import { restaurantService, oneRestaurantService, addRestaurantService, updateRestaurantService, deleteRestaurantService } from "./restaurant.service";

export const restaurantController = async (c: Context) => {
    try{
        const restaurants = await restaurantService();
        return c.json(restaurants);
    } catch (err: any) {
        console.error(err)
        return c.json({error: 'Internal Server Error'}, 500)
    }
    
}
export const oneRestaurantController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const restaurant = await oneRestaurantService(id);
    if (restaurant == undefined) {
        return c.text("Restaurant not found", 404);
    }
    return c.json(restaurant, 200);
}

//add restaurant

export const addRestaurantController = async (c: Context) => {
    try {
        const restaurant = await c.req.json();
        const createdRestaurant = await addRestaurantService(restaurant);

        if (!createdRestaurant) return c.text("Restaurant not created", 404);
        return c.json({ msg: createdRestaurant }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateRestaurantController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const restaurant = await c.req.json();
    try {
        const searchedRestaurant = await oneRestaurantService(id);
        if (searchedRestaurant == undefined) return c.text("Restaurant not found", 404);
        const res = await updateRestaurantService(id, restaurant);
        if (!res) return c.text("Restaurant not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteRestaurantController = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const restaurant = await oneRestaurantService(id);
        if (restaurant == undefined) return c.text("Restaurant not found", 404);
        const res = await deleteRestaurantService(id);
        if (!res) return c.text("Restaurant not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
