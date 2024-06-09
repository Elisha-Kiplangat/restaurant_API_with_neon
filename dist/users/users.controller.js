"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.addUserController = exports.oneUserController = exports.userController = void 0;
const users_service_1 = require("./users.service");
const userController = async (c) => {
    try {
        const users = await (0, users_service_1.userService)();
        return c.json(users);
    }
    catch (err) {
        console.error(err);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
};
exports.userController = userController;
// one user
const oneUserController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await (0, users_service_1.oneUserService)(id);
    if (user == undefined) {
        return c.text("User not found", 404);
    }
    return c.json(user, 200);
};
exports.oneUserController = oneUserController;
//add user
const addUserController = async (c) => {
    try {
        const user = await c.req.json();
        const createdUser = await (0, users_service_1.addUserService)(user);
        if (!createdUser)
            return c.text("User not created", 404);
        return c.json({ msg: createdUser }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.addUserController = addUserController;
const updateUserController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await c.req.json();
    try {
        // search for the user
        const searchedUser = await (0, users_service_1.oneUserService)(id);
        if (searchedUser == undefined)
            return c.text("User not found", 404);
        // get the data and update it
        const res = await (0, users_service_1.updateUserService)(id, user);
        // return a success message
        if (!res)
            return c.text("User not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateUserController = updateUserController;
const deleteUserController = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const user = await (0, users_service_1.oneUserService)(id);
        if (user == undefined)
            return c.text("User not found", 404);
        //deleting the user
        const res = await (0, users_service_1.deleteUserService)(id);
        if (!res)
            return c.text("User not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteUserController = deleteUserController;
