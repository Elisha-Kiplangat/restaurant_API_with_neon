import { Context } from "hono";
import { cityService, oneCityService, addCityService, updateCityService, deleteCityService } from "./city.service";

export const cityController = async (c: Context) => {
    try {
        const city = await cityService();
        return c.json(city);
    } catch (err: any) {
        console.error(err)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const oneCityController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const city = await oneCityService(id);
    if (city == undefined) {
        return c.text("city not found", 404);
    }
    return c.json(city, 200);
}

//add city

export const addCityController = async (c: Context) => {
    try {
        const city = await c.req.json();
        const createdcity = await addCityService(city);

        if (!createdcity) return c.text("User not created", 404);
        return c.json({ msg: createdcity }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

// update city

export const updateCityController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {

        const searchedcity = await oneCityService(id);
        if (searchedcity == undefined) return c.text("city not found", 404);

        const res = await updateCityService(id, user);

        if (!res) return c.text("city not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteCityController = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const city = await oneCityService(id);
        if (city == undefined) return c.text("city not found", 404);

        const res = await deleteCityService(id);
        if (!res) return c.text("city not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}