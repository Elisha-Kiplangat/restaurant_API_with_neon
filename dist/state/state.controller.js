"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStateController = exports.updateStateController = exports.addState = exports.oneStateController = exports.stateController = void 0;
const state_service_1 = require("./state.service");
const stateController = async (c) => {
    try {
        const state = await (0, state_service_1.stateService)();
        return c.json(state);
    }
    catch (err) {
        console.error(err);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
};
exports.stateController = stateController;
const oneStateController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const state = await (0, state_service_1.oneStateService)(id);
    if (state == undefined) {
        return c.text("State not found", 404);
    }
    return c.json(state, 200);
};
exports.oneStateController = oneStateController;
//add state
const addState = async (c) => {
    try {
        const state = await c.req.json();
        const createdState = await (0, state_service_1.addStateService)(state);
        if (!createdState)
            return c.text("User not created", 404);
        return c.json({ msg: createdState }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.addState = addState;
// update state
const updateStateController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await c.req.json();
    try {
        const searchedState = await (0, state_service_1.oneStateService)(id);
        if (searchedState == undefined)
            return c.text("State not found", 404);
        const res = await (0, state_service_1.updateStateService)(id, user);
        if (!res)
            return c.text("State not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateStateController = updateStateController;
const deleteStateController = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const state = await (0, state_service_1.oneStateService)(id);
        if (state == undefined)
            return c.text("State not found", 404);
        //deleting the user
        const res = await (0, state_service_1.deleteStateService)(id);
        if (!res)
            return c.text("State not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteStateController = deleteStateController;
