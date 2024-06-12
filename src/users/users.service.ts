import { stat } from "fs";
import db from "../drizzle/db"
import { userselect, userInsert, userTable, orderTable } from "../drizzle/schema"
import { eq } from "drizzle-orm";

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

// export const addUserService = async (user: userInsert) => {
//     await db.insert(userTable).values(user)
//     return "User added successfully";
// }

export const updateUserService = async (id: number, user: userInsert) => {
    try {
        const searchedUser = await oneUserService(id);
        if (!searchedUser) {
            return false;
        }
        await db.update(userTable).set(user).where(eq(userTable.id, id));
        return "User updated successfully";
    } catch (error) {
        throw new Error("Failed to update user: ");
    }
    return undefined;
}

export const deleteUserService = async (id: number) => {
    await db.delete(userTable).where(eq(userTable.id, id));
    return "User deleted successfully"
}

// user details, if a user, get the orders and the state, city, and the order status


export const userDetailService = async (id: number) => {
    return await db.query.userTable.findMany({
        with: {
            order: true,
            address: true
        },
        where: eq(userTable.id, id)
    });
};
