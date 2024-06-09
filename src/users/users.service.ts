import db from "../drizzle/db"
import { userselect, userInsert, userTable } from "../drizzle/schema"
import {eq} from "drizzle-orm";

// all users
export const userService = async (): Promise<userselect[]> => {
    try {
        const users = await db.query.userTable.findMany();
        console.log('Users fetched:', users);
        return users;
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        throw error;
    }
}
export const oneUserService = async (id: number): Promise<userselect | undefined> => {
    return await db.query.userTable.findFirst({
        where: eq(userTable.id, id)
    })
}

export const addUserService = async (user: userInsert) => {
    await db.insert(userTable).values(user)
    return "User added successfully";
}

export const updateUserService = async (id: number, user: userInsert) => {
    try {
        // First, check if the user with the given ID exists
        const searchedUser = await oneUserService(id);
        if (!searchedUser) {
            // If user not found, return false to indicate failure
            return false;
    }
    await db.update(userTable).set(user).where(eq(userTable.id, id));
    return "User updated successfully";
} catch (error) {
        // Handle any errors
        throw new Error("Failed to update user: ");
    }
}

export const deleteUserService = async (id: number) => {
    await db.delete(userTable).where(eq(userTable.id, id));
    return "User deleted successfully"
}