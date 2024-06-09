import db from "../drizzle/db"
import { restaurantOwnerselect, restaurantOwnerInsert, restaurantOwnerTable } from "../drizzle/schema"
import { eq } from "drizzle-orm";

export const restaurantOwnerService = async (): Promise<restaurantOwnerselect[]> => {
    try {
        const restaurantOwner = await db.query.restaurantOwnerTable.findMany();
        console.log('Restauurant owners fetched:', restaurantOwner);
        return restaurantOwner;
    } catch (error) {
        console.error('Error fetching restaurant owners:', error);
        throw error;
    }
}

export const oneRestaurantOwnerService = async (id: number): Promise<restaurantOwnerselect | undefined> => {
    return await db.query.restaurantOwnerTable.findFirst({
        where: eq(restaurantOwnerTable.id, id)
    })
}

export const addRestaurantOwnerService = async (restaurantOwner: restaurantOwnerInsert) => {
    await db.insert(restaurantOwnerTable).values(restaurantOwner)
    return "restaurant Owner added successfully";
}

export const updateRestaurantOwnerService = async (id: number, restaurantOwner: restaurantOwnerInsert) => {
    try {
        const searchedRestaurantOwner = await oneRestaurantOwnerService(id);
        if (!searchedRestaurantOwner) {
            return false;
        }
        await db.update(restaurantOwnerTable).set(restaurantOwner).where(eq(restaurantOwnerTable.id, id));
        return "restaurant Owner updated successfully";
    } catch (error) {
        throw new Error("Failed to update restaurant Owner: ");
    }
}

export const deleteRestaurantOwnerService = async (id: number) => {
    await db.delete(restaurantOwnerTable).where(eq(restaurantOwnerTable.id, id));
    return "restaurant Owner deleted successfully"
}