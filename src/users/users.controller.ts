import { Context } from "hono";
import { userService, oneUserService, addUserService, userDetailService, updateUserService, deleteUserService } from "./users.service";
import bcrypt from 'bcrypt';


export const userController = async (c: Context) => {
    try{
        const limit = Number(c.req.query('limit'));
        const users = await userService(limit);
        if (users == null || users.length == 0) {
            return c.text("No users found", 404);
        }
        return c.json(users, 200);
    } catch (err: any) {
        console.error(err)
        return c.json({error: 'Internal Server Error'}, 500)
    }
    
}
// one user
export const oneUserController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await oneUserService(id);
    if (user == undefined) {
        return c.text("User not found", 404);
    }
    return c.json(user, 200);
}

//add user

export const addUserController = async (c: Context) => {
    try {
        const user = await c.req.json();
        const pass = user.password;
        const hashedPass = await bcrypt.hash(pass, 10);
        user.password = hashedPass;
        const createdUser = await addUserService(user);

        if (!createdUser) return c.text("User not created", 404);
        return c.json({ msg: createdUser }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateUserController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {
        // search for the user
        const searchedUser = await oneUserService(id);
        if (searchedUser == undefined) return c.text("User not found", 404);
        // get the data and update it
        const res = await updateUserService(id, user);
        // return a success message
        if (!res) return c.text("User not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteUserController = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const user = await oneUserService(id);
        if (user == undefined) return c.text("User not found", 404);
        //deleting the user
        const res = await deleteUserService(id);
        if (!res) return c.text("User not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

//
export const userDetailController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const userDetails = await userDetailService(id);
        if (!userDetails || userDetails.length === 0) {
            return c.text("User not found", 404);
        }
        return c.json(userDetails, 200);
    } catch (error) {
        console.error(error);
        return c.text("Internal Server Error", 500);
    }
};