import { Context } from "hono";
import { driverService, oneDriverService, addDriverService, updateDriverService, deleteDriverService } from "./driver.service";

export const driverController = async (c: Context) => {
    try {
        const driver = await driverService();
        return c.json(driver);
    } catch (err: any) {
        console.error(err)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const oneDriverController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const driver = await oneDriverService(id);
    if (driver == undefined) {
        return c.text("driver not found", 404);
    }
    return c.json(driver, 200);
}

//add driver

export const addDriverController = async (c: Context) => {
    try {
        const driver = await c.req.json();
        const createdDriver = await addDriverService(driver);

        if (!createdDriver) return c.text("User not created", 404);
        return c.json({ msg: createdDriver }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

// update driver

export const updateDriverController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {

        const searchedDriver = await oneDriverService(id);
        if (searchedDriver == undefined) return c.text("driver not found", 404);

        const res = await updateDriverService(id, user);

        if (!res) return c.text("driver not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteDriverController = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const driver = await oneDriverService(id);
        if (driver == undefined) return c.text("driver not found", 404);

        const res = await deleteDriverService(id);
        if (!res) return c.text("driver not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}