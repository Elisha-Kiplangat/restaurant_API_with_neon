import db from "../drizzle/db"
import { orderStatusSelect, orderStatusInsert, orderStatusTable } from "../drizzle/schema"
import { eq } from "drizzle-orm";

export const orderStatusService = async (): Promise<orderStatusSelect[]> => {
    try {
        const orderStatus = await db.query.orderStatusTable.findMany();
        console.log('Order status fetched:', orderStatus);
        return orderStatus;
    } catch (error) {
        console.error('Error fetching Order status:', error);
        throw error;
    }
}

export const oneOrderStatusService = async (id: number): Promise<orderStatusSelect | undefined> => {
    return await db.query.orderStatusTable.findFirst({
        where: eq(orderStatusTable.id, id)
    })
}

export const addOrderStatusService = async (orderStatus: orderStatusInsert) => {
    await db.insert(orderStatusTable).values(orderStatus)
    return "order Status added successfully";
}

export const updateOrderStatusService = async (id: number, orderStatus: orderStatusInsert) => {
    try {
        const searchedOrderStatus = await oneOrderStatusService(id);
        if (!searchedOrderStatus) {
            return false;
        }
        await db.update(orderStatusTable).set(orderStatus).where(eq(orderStatusTable.id, id));
        return "order Status updated successfully";
    } catch (error) {
        throw new Error("Failed to update orderStatus: ");
    }
}

export const deleteOrderStatusService = async (id: number) => {
    await db.delete(orderStatusTable).where(eq(orderStatusTable.id, id));
    return "order Status deleted successfully"
}