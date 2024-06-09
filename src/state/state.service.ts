import db from "../drizzle/db"
import { stateselect, stateInsert, stateTable } from "../drizzle/schema"
import {eq} from "drizzle-orm";


export const stateService = async (): Promise<stateselect[]> => {
    try {
        const state = await db.query.stateTable.findMany();
        console.log('States fetched:', state);
        return state;
    } catch (error) {
        console.error('Error fetching states:', error);
        throw error;
    }
}
export const oneStateService = async (id: number): Promise<stateselect | undefined> => {
    return await db.query.stateTable.findFirst({
        where: eq(stateTable.id, id)
    })
}

export const addStateService = async (state: stateInsert) => {
    await db.insert(stateTable).values(state)
    return "State added successfully";
}

export const updateStateService = async (id: number, state: stateInsert) => {
    try {
        // First, check if the user with the given ID exists
        const searchedState = await oneStateService(id);
        if (!searchedState) {
            // If user not found, return false to indicate failure
            return false;
    }
    await db.update(stateTable).set(state).where(eq(stateTable.id, id));
    return "State updated successfully";
} catch (error) {
        // Handle any errors
        throw new Error("Failed to update state: ");
    }
}

export const deleteStateService = async (id: number) => {
    await db.delete(stateTable).where(eq(stateTable.id, id));
    return "State deleted successfully"
}