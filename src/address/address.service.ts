import db from "../drizzle/db"
import { addressselect, addressInsert, addressTable } from "../drizzle/schema"
import {eq} from "drizzle-orm";

// all users
export const addressService = async (): Promise<addressselect[]> => {
    try {
        const address = await db.query.addressTable.findMany();
        console.log('Addresses fetched:', address);
        return address;
    } catch (error) {
        console.error('Error fetching addresses:', error);
        throw error;
    }
}
export const oneAddressService = async (id: number): Promise<addressselect | undefined> => {
    return await db.query.addressTable.findFirst({
        where: eq(addressTable.id, id)
    })
}

export const addAddressService = async (user: addressInsert) => {
    await db.insert(addressTable).values(user)
    return "Address added successfully";
}

export const updateAddressService = async (id: number, address: addressInsert) => {
    await db.update(addressTable).set(address).where(eq(addressTable.id, id));
    return "Address updated successfully";
}

export const deleteAddressService = async (id: number) => {
    await db.delete(addressTable).where(eq(addressTable.id, id));
    return "Address deleted successfully"
}