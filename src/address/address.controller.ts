import { Context } from "hono";
import { addressService, oneAddressService, addAddressService,updateAddressService, deleteAddressService } from "./address.service";
import { addressTable } from "../drizzle/schema";

export const addressController = async (c: Context) => {
    try{
        const address = await addressService();
        return c.json(address);
    } catch (err: any) {
        console.error(err)
        return c.json({error: 'Internal Server Error'}, 500)
    }
    
}
// one user
export const oneAddressController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const address = await oneAddressService(id);
    if (address == undefined) {
        return c.text("Address not found", 404);
    }
    return c.json(address, 200);
}

//add user

export const addAddressController = async (c: Context) => {
    try {
        const address = await c.req.json();
        const createdUser = await addAddressService(address);

        if (!createdUser) return c.text("Address not created", 404);
        return c.json({ msg: createdUser }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateAddressController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {
        // search for the user
        const searchedAddress = await oneAddressService(id);
        if (searchedAddress == undefined) return c.text("Address not found", 404);
        // get the data and update it
        const res = await updateAddressService(id, user);
        // return a success message
        if (!res) return c.text("Address not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteAddressController = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const address = await oneAddressService(id);
        if (address == undefined) return c.text("Address not found", 404);
        //deleting the user
        const res = await deleteAddressService(id);
        if (!res) return c.text("Address not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
