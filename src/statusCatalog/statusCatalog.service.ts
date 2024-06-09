import db from "../drizzle/db"
import { statusCatalogselect, statusCatalogInsert, statusCatalogTable } from "../drizzle/schema"
import { eq } from "drizzle-orm";

export const statusCatalogService = async (): Promise<statusCatalogselect[]> => {
    try {
        const statusCatalog = await db.query.statusCatalogTable.findMany();
        console.log('Status catalog fetched:', statusCatalog);
        return statusCatalog;
    } catch (error) {
        console.error('Error fetching status:', error);
        throw error;
    }
}

export const oneStatusCatalogService = async (id: number): Promise<statusCatalogselect | undefined> => {
    return await db.query.statusCatalogTable.findFirst({
        where: eq(statusCatalogTable.id, id)
    })
}

export const addStatusCatalogService = async (statusCatalog: statusCatalogInsert) => {
    await db.insert(statusCatalogTable).values(statusCatalog)
    return "statusCatalog added successfully";
}

export const updateStatusCatalogService = async (id: number, statusCatalog: statusCatalogInsert) => {
    try {
        const searchedStatusCatalog = await oneStatusCatalogService(id);
        if (!searchedStatusCatalog) {
            return false;
        }
        await db.update(statusCatalogTable).set(statusCatalog).where(eq(statusCatalogTable.id, id));
        return "statusCatalog updated successfully";
    } catch (error) {
        throw new Error("Failed to update statusCatalog: ");
    }
}

export const deleteStatusCatalogService = async (id: number) => {
    await db.delete(statusCatalogTable).where(eq(statusCatalogTable.id, id));
    return "statusCatalog deleted successfully"
}