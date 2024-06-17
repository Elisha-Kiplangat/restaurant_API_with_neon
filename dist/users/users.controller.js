"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDetailController = exports.deleteUserController = exports.updateUserController = exports.addUserController = exports.oneUserController = exports.userController = void 0;
const users_service_1 = require("./users.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userController = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const users = await (0, users_service_1.userService)(limit);
        if (users == null || users.length == 0) {
            return c.text("No users found", 404);
        }
        return c.json(users, 200);
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
        const pass = user.password;
        const hashedPass = await bcrypt_1.default.hash(pass, 10);
        user.password = hashedPass;
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
//
const userDetailController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const userDetails = await (0, users_service_1.userDetailService)(id);
        if (!userDetails || userDetails.length === 0) {
            return c.text("User not found", 404);
        }
        return c.json(userDetails, 200);
    }
    catch (error) {
        console.error(error);
        return c.text("Internal Server Error", 500);
    }
};
exports.userDetailController = userDetailController;
