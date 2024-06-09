import { Context } from "hono";
import { menuItemService, oneMenuItemService, addMenuItemService, updateMenuItemService, deleteMenuItemService } from "./menuItem.service";

export const menuItemController = async (c: Context) => {
    try{
        const menuItem = await menuItemService();
        return c.json(menuItem);
    } catch (err: any) {
        console.error(err)
        return c.json({error: 'Internal Server Error'}, 500)
    }
}

export const oneMenuItemController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const menuItem = await oneMenuItemService(id);
    if (menuItem == undefined) {
        return c.text("menuItem not found", 404);
    }
    return c.json(menuItem, 200);
}

//add menuItem

export const addMenuItem = async (c: Context) => {
    try {
        const menuItem = await c.req.json();
        const createdMenuItem = await addMenuItemService(menuItem);

        if (!createdMenuItem) return c.text("User not created", 404);
        return c.json({ msg: createdMenuItem }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

// update menuItem

export const updateMenuItemController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {

        const searchedMenuItem = await oneMenuItemService(id);
        if (searchedMenuItem == undefined) return c.text("menuItem not found", 404);

        const res = await updateMenuItemService(id, user);

        if (!res) return c.text("menuItem not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteMenuItemController = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const menuItem = await oneMenuItemService(id);
        if (menuItem == undefined) return c.text("menuItem not found", 404);
    
        const res = await deleteMenuItemService(id);
        if (!res) return c.text("menuItem not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}