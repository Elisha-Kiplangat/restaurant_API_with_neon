import db from "../drizzle/db"
import { cityselect, cityInsert, cityTable } from "../drizzle/schema"
import { eq } from "drizzle-orm";

export const cityService = async (): Promise<cityselect[]> => {
    try {
        const city = await db.query.cityTable.findMany();
        console.log('cities fetched:', city);
        return city;
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
}

export const oneCityService = async (id: number): Promise<cityselect | undefined> => {
    return await db.query.cityTable.findFirst({
        where: eq(cityTable.id, id)
    })
}

export const addCityService = async (city: cityInsert) => {
    await db.insert(cityTable).values(city)
    return "city added successfully";
}

export const updateCityService = async (id: number, city: cityInsert) => {
    try {
        const searchedCity = await oneCityService(id);
        if (!searchedCity) {
            return false;
        }
        await db.update(cityTable).set(city).where(eq(cityTable.id, id));
        return "city updated successfully";
    } catch (error) {
        throw new Error("Failed to update city: ");
    }
}

export const deleteCityService = async (id: number) => {
    await db.delete(cityTable).where(eq(cityTable.id, id));
    return "city deleted successfully"
}