import db from "../drizzle/db"
import { orderselect, orderInsert, orderTable } from "../drizzle/schema"
import {eq} from 'drizzle-orm'

export const orderService = async (): Promise<orderselect[]> => {
    try {
        const orders = await db.query.orderTable.findMany();
        console.log('Orders fetched:', orders);
        return orders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}

//one
export const oneOrderService = async (id: number): Promise<orderselect | undefined> => {
    return await db.query.orderTable.findFirst({
        where: eq(orderTable.id, id)
    })
}
// add
export const addOrderService = async (order: orderInsert) => {
    await db.insert(orderTable).values(order)
    return "order added successfully";
}
//update
export const updateOrderService = async (id: number, order: orderInsert) => {
    try {
        const searchedOrder = await oneOrderService(id);
        if (!searchedOrder) {
            return false;
    }
    await db.update(orderTable).set(order).where(eq(orderTable.id, id));
    return "order updated successfully";
} catch (error) {
        // Handle any errors
        throw new Error("Failed to update order: ");
    }
}
//delete
export const deleteOrderService = async (id: number) => {
    await db.delete(orderTable).where(eq(orderTable.id, id));
    return "order deleted successfully"
}

// order with order menu item
// export const orderWithOrderMenuItemService = async (id: number) => {
//     return await db.query.orderTable.findMany({
//         with: {
//             orderMenuItem: {
//                 columns: {
//                     quantity: true
//                 }
//             }
//         },
//         where: eq(orderTable.id, id)
//     });
// };

// service.ts
export const orderWithOrderMenuItemService = async (id: number) => {
    try {
        return await db.query.orderTable.findMany({
            columns: {
                id: true,
                actualDeliveryTime: true,
                price: true
            },
            with: {
                order: {
                    columns:{
                        quantity: true
                    }
                },
                address: {
                    columns: {
                        streetAddress1: true,
                        deliveryInstructions: true
                    }
                }
            },
            where: eq(orderTable.id, id)
        });
    } catch (error) {
        console.error('Database query failed:', error); // Detailed error logging
        throw new Error(`Database query failed`);
    }
};

