import { Context } from "hono";
import { stateService, oneStateService, addStateService, updateStateService, deleteStateService } from "./state.service";

export const stateController = async (c: Context) => {
    try{
        const state = await stateService();
        return c.json(state);
    } catch (err: any) {
        console.error(err)
        return c.json({error: 'Internal Server Error'}, 500)
    }
    
}
export const oneStateController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const state = await oneStateService(id);
    if (state == undefined) {
        return c.text("State not found", 404);
    }
    return c.json(state, 200);
}

//add state

export const addState = async (c: Context) => {
    try {
        const state = await c.req.json();
        const createdState = await addStateService(state);

        if (!createdState) return c.text("User not created", 404);
        return c.json({ msg: createdState }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

// update state

export const updateStateController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {
        
        const searchedState = await oneStateService(id);
        if (searchedState == undefined) return c.text("State not found", 404);
        
        const res = await updateStateService(id, user);
        
        if (!res) return c.text("State not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteStateController = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const state = await oneStateService(id);
        if (state == undefined) return c.text("State not found", 404);
        //deleting the user
        const res = await deleteStateService(id);
        if (!res) return c.text("State not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}