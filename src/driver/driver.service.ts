import db from "../drizzle/db"
import { driverselect, driverInsert, driverTable } from "../drizzle/schema"
import { eq } from "drizzle-orm";

export const driverService = async (): Promise<driverselect[]> => {
    try {
        const driver = await db.query.driverTable.findMany();
        console.log('Drivers fetched:', driver);
        return driver;
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
}

export const oneDriverService = async (id: number): Promise<driverselect | undefined> => {
    return await db.query.driverTable.findFirst({
        where: eq(driverTable.id, id)
    })
}

export const addDriverService = async (driver: driverInsert) => {
    await db.insert(driverTable).values(driver)
    return "driver added successfully";
}

export const updateDriverService = async (id: number, driver: driverInsert) => {
    try {
        const searchedDriver = await oneDriverService(id);
        if (!searchedDriver) {
            return false;
        }
        await db.update(driverTable).set(driver).where(eq(driverTable.id, id));
        return "driver updated successfully";
    } catch (error) {
        throw new Error("Failed to update driver: ");
    }
}

export const deleteDriverService = async (id: number) => {
    await db.delete(driverTable).where(eq(driverTable.id, id));
    return "driver deleted successfully"
}