import db from "../drizzle/db"
import { orderMenuItemselect, orderMenuItemInsert, order_menu_itemTable } from "../drizzle/schema"
import { eq } from "drizzle-orm";

export const orderMenuItemService = async (): Promise<orderMenuItemselect[]> => {
    try {
        const orderMenuItem = await db.query.order_menu_itemTable.findMany();
        console.log('cities fetched:', orderMenuItem);
        return orderMenuItem;
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
}

export const oneOrderMenuItemService = async (id: number): Promise<orderMenuItemselect | undefined> => {
    return await db.query.order_menu_itemTable.findFirst({
        where: eq(order_menu_itemTable.id, id)
    })
}

export const addOrderMenuItemService = async (orderMenuItem: orderMenuItemInsert) => {
    await db.insert(order_menu_itemTable).values(orderMenuItem)
    return "orderMenuItem added successfully";
}

export const updateOrderMenuItemService = async (id: number, orderMenuItem: orderMenuItemInsert) => {
    try {
        const searchedOrderMenuItem = await oneOrderMenuItemService(id);
        if (!searchedOrderMenuItem) {
            return false;
        }
        await db.update(order_menu_itemTable).set(orderMenuItem).where(eq(order_menu_itemTable.id, id));
        return "orderMenuItem updated successfully";
    } catch (error) {
        throw new Error("Failed to update orderMenuItem: ");
    }
}

export const deleteOrderMenuItemService = async (id: number) => {
    await db.delete(order_menu_itemTable).where(eq(order_menu_itemTable.id, id));
    return "orderMenuItem deleted successfully"
}