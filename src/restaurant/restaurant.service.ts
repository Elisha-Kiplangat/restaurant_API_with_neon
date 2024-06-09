import db from "../drizzle/db"
import { restaurantTable, restaurantselect, restaurantInsert} from "../drizzle/schema"
import {eq} from 'drizzle-orm'


//All
export const restaurantService = async (): Promise<restaurantselect[]> => {
    try {
        const restaurants = await db.query.restaurantTable.findMany();
        console.log('Restaurants fetched:', restaurants);
        return restaurants;
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        throw error;
    }
}
//one
export const oneRestaurantService = async (id: number): Promise<restaurantselect | undefined> => {
    return await db.query.restaurantTable.findFirst({
        where: eq(restaurantTable.id, id)
    })
}
// add
export const addRestaurantService = async (restaurant: restaurantInsert) => {
    await db.insert(restaurantTable).values(restaurant)
    return "Restaurant added successfully";
}
//update
export const updateRestaurantService = async (id: number, restaurant: restaurantInsert) => {
    try {
        const searchedRestaurant = await oneRestaurantService(id);
        if (!searchedRestaurant) {
            return false;
    }
    await db.update(restaurantTable).set(restaurant).where(eq(restaurantTable.id, id));
    return "Restaurant updated successfully";
} catch (error) {
        // Handle any errors
        throw new Error("Failed to update restaurant: ");
    }
}
//delete
export const deleteRestaurantService = async (id: number) => {
    await db.delete(restaurantTable).where(eq(restaurantTable.id, id));
    return "Restaurant deleted successfully"
}